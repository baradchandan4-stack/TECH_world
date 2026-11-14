import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang, Tri } from '../content/types';
import { ACHIEVEMENTS, WORLDS, evaluateAchievements, levelFromXp, pick, RANKS } from '../content';
import { UI, type UIKey } from '../i18n/ui';
import { setMusicEnabled, sfx, stopSpeaking } from '../lib/audio';

const STORAGE_KEY = 'techquest:world:v1';

export interface HistoryEntry {
  t: number;
  kind: string;
  label: string;
  xp: number;
}

export interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  lang: Lang;
  onboarded: boolean;
  xp: number;
  coins: number;
  stars: number;
  lessonsDone: string[];
  quizzes: Record<string, number>;
  worldsDone: string[];
  bookmarks: string[];
  achievements: string[];
  repairsDone: string[];
  buildsDone: number;
  circuitsDone: number;
  bestScore: number;
  dailyDate: string;
  history: HistoryEntry[];
  settings: { music: boolean; sfx: boolean; voice: boolean; quality: 'high' | 'low' };
}

const AVATARS = ['👩‍🚀', '🧑‍💻', '👨‍🔧', '🦸', '🤖', '🐯', '🦊', '🐼'];
export { AVATARS };

function newId(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `tq-${Date.now().toString(36)}-${rand}`;
}

function freshPlayer(): PlayerState {
  return {
    id: newId(),
    name: '',
    avatar: AVATARS[0],
    lang: 'en',
    onboarded: false,
    xp: 0,
    coins: 0,
    stars: 0,
    lessonsDone: [],
    quizzes: {},
    worldsDone: [],
    bookmarks: [],
    achievements: [],
    repairsDone: [],
    buildsDone: 0,
    circuitsDone: 0,
    bestScore: 0,
    dailyDate: '',
    history: [],
    settings: { music: true, sfx: true, voice: true, quality: 'high' },
  };
}

function loadLocal(): PlayerState {
  const base = freshPlayer();
  if (typeof window === 'undefined') return base;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PlayerState>;
    return {
      ...base,
      ...parsed,
      settings: { ...base.settings, ...(parsed.settings || {}) },
      id: parsed.id && /^[A-Za-z0-9_-]{4,64}$/.test(parsed.id) ? parsed.id : base.id,
    };
  } catch {
    return base;
  }
}

export interface Toast {
  id: number;
  icon: string;
  text: string;
  tone: 'good' | 'bad' | 'info';
}

interface AwardOpts {
  xp?: number;
  coins?: number;
  stars?: number;
  kind?: string;
  label?: string;
  silent?: boolean;
}

interface GameCtx {
  p: PlayerState;
  lang: Lang;
  level: number;
  rankName: string;
  nextXp: number;
  levelProgress: number;
  t: (key: UIKey) => string;
  tr: (tri: Tri | string | undefined) => string;
  setLang: (l: Lang) => void;
  patch: (part: Partial<PlayerState>) => void;
  award: (opts: AwardOpts) => void;
  completeLesson: (lessonId: string, worldId: string, scorePct: number) => void;
  toggleBookmark: (lessonId: string) => void;
  finishRepair: (caseId: string) => void;
  finishBuild: () => void;
  finishCircuit: () => void;
  saveMinigame: (score: number, label: string) => void;
  claimDaily: () => void;
  reset: () => void;
  toasts: Toast[];
  pushToast: (text: string, icon?: string, tone?: Toast['tone']) => void;
  unlockedWorlds: string[];
  today: string;
}

const Ctx = createContext<GameCtx | null>(null);

const todayStr = () => new Date().toISOString().slice(0, 10);

export function GameProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<PlayerState>(() => loadLocal());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(1);
  const synced = useRef(false);
  const saveTimer = useRef<number | null>(null);

  const pushToast = useCallback((text: string, icon = '✨', tone: Toast['tone'] = 'info') => {
    const id = toastId.current++;
    setToasts((prev) => [...prev.slice(-3), { id, icon, text, tone }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3600);
  }, []);

  // Persist locally + debounce to the server.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* storage may be full or blocked */
    }
    if (!p.onboarded) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      void fetch(`/api/player/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      }).catch(() => undefined);
    }, 900);
  }, [p]);

  // Restore from server on first load (guest saves stay local).
  useEffect(() => {
    if (synced.current) return;
    synced.current = true;
    const id = p.id;
    if (!id) return;
    void (async () => {
      try {
        const res = await fetch(`/api/player/${id}`);
        if (!res.ok) return;
        const remote = (await res.json()) as Partial<PlayerState>;
        if (!remote || typeof remote.xp !== 'number') return;
        setP((cur) => {
          if (remote.xp! <= cur.xp && cur.lessonsDone.length >= (remote.lessonsDone?.length || 0)) return cur;
          return {
            ...cur,
            xp: Math.max(cur.xp, remote.xp || 0),
            coins: Math.max(cur.coins, remote.coins || 0),
            stars: Math.max(cur.stars, remote.stars || 0),
            lessonsDone: Array.from(new Set([...cur.lessonsDone, ...(remote.lessonsDone || [])])),
            quizzes: { ...(remote.quizzes || {}), ...cur.quizzes },
            bookmarks: Array.from(new Set([...cur.bookmarks, ...(remote.bookmarks || [])])),
            achievements: Array.from(new Set([...cur.achievements, ...(remote.achievements || [])])),
            history: cur.history.length ? cur.history : remote.history || [],
          };
        });
      } catch {
        /* offline is fine, local save still works */
      }
    })();
  }, [p.id]);

  // Apply audio settings.
  useEffect(() => {
    sfx.setEnabled(p.settings.sfx);
    setMusicEnabled(p.settings.music);
  }, [p.settings.sfx, p.settings.music]);

  const level = levelFromXp(p.xp);
  const rank = RANKS[level - 1] || RANKS[0];
  const nextXp = RANKS[Math.min(level, 9)]?.xp ?? 4500;
  const prevXp = rank.xp;
  const levelProgress = level >= 10 ? 1 : Math.max(0, Math.min(1, (p.xp - prevXp) / Math.max(1, nextXp - prevXp)));

  const t = useCallback((key: UIKey) => (UI[key] ? UI[key][p.lang] || UI[key].en : String(key)), [p.lang]);
  const tr = useCallback((tri: Tri | string | undefined) => pick(tri, p.lang), [p.lang]);

  const patch = useCallback((part: Partial<PlayerState>) => {
    setP((cur) => ({ ...cur, ...part }));
  }, []);

  const setLang = useCallback((l: Lang) => {
    setP((cur) => ({ ...cur, lang: l }));
    stopSpeaking();
  }, []);

  const award = useCallback(
    (opts: AwardOpts) => {
      const xpGain = Math.max(0, Math.round(opts.xp || 0));
      const coinGain = Math.max(0, Math.round(opts.coins || 0));
      const starGain = Math.max(0, Math.round(opts.stars || 0));
      if (!xpGain && !coinGain && !starGain) return;
      setP((cur) => {
        const before = levelFromXp(cur.xp);
        const after = levelFromXp(cur.xp + xpGain);
        if (after > before) window.setTimeout(() => sfx.levelUp(), 120);
        const entry: HistoryEntry = {
          t: Date.now(),
          kind: opts.kind || 'reward',
          label: opts.label || '',
          xp: xpGain,
        };
        return {
          ...cur,
          xp: cur.xp + xpGain,
          coins: cur.coins + coinGain,
          stars: cur.stars + starGain,
          history: [entry, ...cur.history].slice(0, 60),
        };
      });
      if (!opts.silent) {
        if (coinGain) sfx.coin();
        pushToast(
          `+${xpGain} XP${coinGain ? `  ·  +${coinGain} 🪙` : ''}`,
          opts.kind === 'level' ? '🏅' : '⭐',
          'good',
        );
      }
    },
    [pushToast],
  );

  const completeLesson = useCallback(
    (lessonId: string, worldId: string, scorePct: number) => {
      setP((cur) => {
        const already = cur.lessonsDone.includes(lessonId);
        const world = WORLDS.find((w) => w.id === worldId);
        const xpGain = already ? 5 : world?.xp ?? 25;
        const lessonsDone = already ? cur.lessonsDone : [...cur.lessonsDone, lessonId];
        const quizzes = { ...cur.quizzes, [lessonId]: Math.max(cur.quizzes[lessonId] || 0, scorePct) };
        const worldLessons = world?.lessonIds || [];
        const worldDone = worldLessons.length > 0 && worldLessons.every((id) => lessonsDone.includes(id));
        const worldsDone = worldDone && world && !cur.worldsDone.includes(world.id) ? [...cur.worldsDone, world.id] : cur.worldsDone;
        const next: PlayerState = {
          ...cur,
          xp: cur.xp + xpGain,
          coins: cur.coins + (already ? 2 : 10),
          stars: cur.stars + (scorePct >= 100 ? 3 : scorePct >= 60 ? 2 : 1),
          lessonsDone,
          quizzes,
          worldsDone,
          history: [{ t: Date.now(), kind: 'lesson', label: lessonId, xp: xpGain }, ...cur.history].slice(0, 60),
        };
        const unlocked = evaluateAchievements({
          lessonsDone: next.lessonsDone,
          quizzes: next.quizzes,
          worldsDone: next.worldsDone,
          repairsDone: next.repairsDone,
          buildsDone: next.buildsDone,
          circuitsDone: next.circuitsDone,
          bestScore: next.bestScore,
          level: levelFromXp(next.xp),
        });
        const fresh = unlocked.filter((id) => !next.achievements.includes(id));
        if (fresh.length) {
          next.achievements = [...next.achievements, ...fresh];
          next.coins += fresh.length * 25;
          const a = ACHIEVEMENTS.find((x) => x.id === fresh[0]);
          window.setTimeout(() => pushToast(a ? pick(a.name, cur.lang) : 'Achievement', a?.icon || '🏆', 'good'), 400);
        }
        if (worldDone) window.setTimeout(() => pushToast(pick(world?.title, cur.lang), '🏁', 'good'), 700);
        window.setTimeout(() => sfx.correct(), 60);
        return next;
      });
    },
    [pushToast],
  );

  const toggleBookmark = useCallback((lessonId: string) => {
    setP((cur) => ({
      ...cur,
      bookmarks: cur.bookmarks.includes(lessonId) ? cur.bookmarks.filter((x) => x !== lessonId) : [...cur.bookmarks, lessonId],
    }));
    sfx.click();
  }, []);

  const finishRepair = useCallback(
    (caseId: string) => {
      setP((cur) => {
        if (cur.repairsDone.includes(caseId)) return cur;
        const next = { ...cur, repairsDone: [...cur.repairsDone, caseId] };
        return next;
      });
      award({ xp: 40, coins: 15, kind: 'repair', label: caseId });
    },
    [award],
  );

  const finishBuild = useCallback(() => {
    setP((cur) => ({ ...cur, buildsDone: cur.buildsDone + 1 }));
    award({ xp: 60, coins: 25, kind: 'build', label: 'pc-build' });
  }, [award]);

  const finishCircuit = useCallback(() => {
    setP((cur) => ({ ...cur, circuitsDone: cur.circuitsDone + 1 }));
    award({ xp: 50, coins: 20, kind: 'circuit', label: 'circuit' });
  }, [award]);

  const saveMinigame = useCallback(
    (score: number, label: string) => {
      setP((cur) => ({ ...cur, bestScore: Math.max(cur.bestScore, score) }));
      award({ xp: Math.max(5, Math.round(score / 2)), coins: Math.max(2, Math.round(score / 10)), kind: 'minigame', label });
    },
    [award],
  );

  const claimDaily = useCallback(() => {
    const today = todayStr();
    if (p.dailyDate === today) return;
    setP((cur) => ({ ...cur, dailyDate: today }));
    award({ xp: 30, coins: 20, kind: 'daily', label: today });
  }, [award, p.dailyDate]);

  const reset = useCallback(() => {
    const fresh = freshPlayer();
    setP({ ...fresh, lang: p.lang, onboarded: false });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    pushToast('Progress reset', '♻️', 'info');
  }, [p.lang, pushToast]);

  const unlockedWorlds = useMemo(() => WORLDS.filter((w) => level >= w.unlockLevel).map((w) => w.id), [level]);

  const value: GameCtx = {
    p,
    lang: p.lang,
    level,
    rankName: pick(rank.name, p.lang),
    nextXp,
    levelProgress,
    t,
    tr,
    setLang,
    patch,
    award,
    completeLesson,
    toggleBookmark,
    finishRepair,
    finishBuild,
    finishCircuit,
    saveMinigame,
    claimDaily,
    reset,
    toasts,
    pushToast,
    unlockedWorlds,
    today: todayStr(),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame(): GameCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
