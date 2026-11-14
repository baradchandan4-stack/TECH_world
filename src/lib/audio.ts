import type { Lang } from '../content/types';

let ctx: AudioContext | null = null;
let musicTimer: number | null = null;
let musicStep = 0;
let musicOn = false;
let sfxOn = true;

function ensure(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.08, delay = 0) {
  if (!sfxOn) return;
  const ac = ensure();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

export const sfx = {
  setEnabled(on: boolean) {
    sfxOn = on;
  },
  click: () => tone(660, 0.08, 'triangle', 0.05),
  hover: () => tone(880, 0.04, 'sine', 0.02),
  correct: () => {
    tone(660, 0.12, 'sine', 0.07);
    tone(880, 0.16, 'sine', 0.06, 0.1);
    tone(1180, 0.2, 'sine', 0.05, 0.2);
  },
  wrong: () => {
    tone(240, 0.18, 'sawtooth', 0.05);
    tone(180, 0.24, 'sawtooth', 0.04, 0.12);
  },
  coin: () => {
    tone(1046, 0.07, 'square', 0.04);
    tone(1568, 0.1, 'square', 0.035, 0.07);
  },
  levelUp: () => {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.18, 'triangle', 0.06, i * 0.11));
  },
  whoosh: () => tone(420, 0.22, 'sine', 0.03),
  error: () => tone(160, 0.3, 'square', 0.05),
};

const SCALE = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 349.23];

export function startMusic() {
  if (musicOn) return;
  const ac = ensure();
  if (!ac) return;
  musicOn = true;
  musicStep = 0;
  const tick = () => {
    if (!musicOn) return;
    const freq = SCALE[musicStep % SCALE.length];
    const ac2 = ensure();
    if (ac2) {
      const osc = ac2.createOscillator();
      const g = ac2.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq / 2;
      g.gain.setValueAtTime(0.0001, ac2.currentTime);
      g.gain.exponentialRampToValueAtTime(0.028, ac2.currentTime + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, ac2.currentTime + 0.85);
      osc.connect(g);
      g.connect(ac2.destination);
      osc.start();
      osc.stop(ac2.currentTime + 0.9);
    }
    musicStep += 1;
    musicTimer = window.setTimeout(tick, 900);
  };
  musicTimer = window.setTimeout(tick, 120);
}

export function stopMusic() {
  musicOn = false;
  if (musicTimer !== null) {
    window.clearTimeout(musicTimer);
    musicTimer = null;
  }
}

export function setMusicEnabled(on: boolean) {
  if (on) startMusic();
  else stopMusic();
}

export function speak(text: string, lang: Lang) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 260));
    u.lang = lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
    u.rate = 0.95;
    u.pitch = 1.15;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(u.lang.slice(0, 2)));
    if (match) u.voice = match;
    window.speechSynthesis.speak(u);
  } catch {
    /* speech is optional */
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}
