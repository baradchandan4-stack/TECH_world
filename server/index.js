import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
const storeFile = path.join(dataDir, 'players.json');

const app = express();
app.use(express.json({ limit: '512kb' }));

/** In-memory cache backed by a JSON file (best effort persistence). */
let store = { players: {} };
let storeReady = false;

function loadStore() {
  if (storeReady) return;
  storeReady = true;
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    if (fs.existsSync(storeFile)) {
      const raw = fs.readFileSync(storeFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.players) store = parsed;
    }
  } catch (err) {
    console.warn('[techquest] could not read player store, using memory only:', err.message);
  }
}

let saveTimer = null;
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(storeFile, JSON.stringify(store), 'utf8');
    } catch (err) {
      console.warn('[techquest] could not write player store:', err.message);
    }
  }, 400);
}

const PLAYER_ID = /^[A-Za-z0-9_-]{4,64}$/;

function cleanPlayer(body) {
  const src = body && typeof body === 'object' ? body : {};
  const arr = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 2000) : []);
  const num = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
  const quiz = {};
  if (src.quizzes && typeof src.quizzes === 'object') {
    for (const [k, v] of Object.entries(src.quizzes).slice(0, 500)) {
      if (typeof v === 'number' && Number.isFinite(v)) quiz[k.slice(0, 80)] = Math.max(0, Math.min(100, Math.round(v)));
    }
  }
  return {
    id: String(src.id || '').slice(0, 64),
    name: String(src.name || 'Explorer').slice(0, 24),
    avatar: String(src.avatar || '👩‍🚀').slice(0, 8),
    lang: ['en', 'gu', 'hi'].includes(src.lang) ? src.lang : 'en',
    xp: num(src.xp),
    coins: num(src.coins),
    stars: num(src.stars),
    lessonsDone: arr(src.lessonsDone).map((s) => s.slice(0, 80)),
    quizzes: quiz,
    worldsUnlocked: arr(src.worldsUnlocked).map((s) => s.slice(0, 40)),
    bookmarks: arr(src.bookmarks).map((s) => s.slice(0, 80)),
    achievements: arr(src.achievements).map((s) => s.slice(0, 60)),
    history: Array.isArray(src.history)
      ? src.history
          .slice(0, 200)
          .map((h) => ({
            t: typeof h?.t === 'number' ? h.t : Date.now(),
            kind: String(h?.kind || 'event').slice(0, 24),
            label: String(h?.label || '').slice(0, 120),
            xp: num(h?.xp),
          }))
      : [],
    dailyDate: typeof src.dailyDate === 'string' ? src.dailyDate.slice(0, 12) : '',
    settings: {
      music: src.settings?.music !== false,
      sfx: src.settings?.sfx !== false,
      voice: src.settings?.voice !== false,
      quality: src.settings?.quality === 'low' ? 'low' : 'high',
    },
    updatedAt: Date.now(),
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, game: 'TECHQUEST WORLD', players: Object.keys(store.players).length });
});

app.get('/api/player/:id', (req, res) => {
  loadStore();
  const id = req.params.id;
  if (!PLAYER_ID.test(id)) return res.status(400).json({ error: 'invalid_id' });
  const player = store.players[id];
  if (!player) return res.status(404).json({ error: 'not_found' });
  res.json(player);
});

app.put('/api/player/:id', (req, res) => {
  loadStore();
  const id = req.params.id;
  if (!PLAYER_ID.test(id)) return res.status(400).json({ error: 'invalid_id' });
  const player = cleanPlayer({ ...req.body, id });
  store.players[id] = player;
  scheduleSave();
  res.json({ ok: true, player });
});

app.get('/api/leaderboard', (_req, res) => {
  loadStore();
  const rows = Object.values(store.players)
    .map((p) => ({ name: p.name, xp: p.xp, stars: p.stars, avatar: p.avatar }))
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 20);
  res.json({ rows });
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found' }));

if (fs.existsSync(dist)) {
  app.use(
    express.static(dist, {
      setHeaders(res, filePath) {
        if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache');
        else res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      },
    }),
  );
  app.get('/*splat', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('/*splat', (_req, res) =>
    res.status(503).type('html').send('<h1>TECHQUEST WORLD</h1><p>Build the client first: npm run build</p>'),
  );
}

const port = Number(process.env.PORT) || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`[techquest] TECHQUEST WORLD running on http://0.0.0.0:${port}`);
});
