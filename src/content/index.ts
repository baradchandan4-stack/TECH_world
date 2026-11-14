import type { Lang, Lesson, Tri } from './types';
import { COMPUTER_LESSONS } from './computer';
import { ELECTRONICS_LESSONS } from './electronics';
import { PCB_LESSONS, CIRCUIT_LESSONS } from './labs';
import { NETWORK_LESSONS, ROBOTICS_LESSONS, FUTURE_LESSONS } from './advanced';
import { WORLDS } from './worlds';
import { REPAIR_CASES } from './repair';

export { WORLDS, REPAIR_CASES };
export type { RepairCase } from './repair';

export const ALL_LESSONS: Lesson[] = [
  ...COMPUTER_LESSONS,
  ...PCB_LESSONS,
  ...ELECTRONICS_LESSONS,
  ...CIRCUIT_LESSONS,
  ...NETWORK_LESSONS,
  ...ROBOTICS_LESSONS,
  ...FUTURE_LESSONS,
];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));

export const pick = (tri: Tri | string | undefined, lang: Lang): string =>
  typeof tri === 'string' ? tri : tri ? tri[lang] || tri.en : '';

export interface RankDef {
  level: number;
  name: Tri;
  icon: string;
  xp: number;
}

/** XP needed to reach each level. Index 0 = level 1. */
export const LEVEL_XP = [0, 120, 300, 560, 900, 1350, 1900, 2600, 3450, 4500];

export const RANKS: RankDef[] = [
  { level: 1, icon: '🌱', xp: 0, name: { en: 'Tech Beginner', gu: 'ટેક બિગિનર', hi: 'टेक बिगिनर' } },
  { level: 2, icon: '🧭', xp: 120, name: { en: 'Computer Explorer', gu: 'કમ્પ્યુટર એક્સપ્લોરર', hi: 'कंप्यूटर एक्सप्लोरर' } },
  { level: 3, icon: '🧰', xp: 300, name: { en: 'Hardware Learner', gu: 'હાર્ડવેર લર્નર', hi: 'हार्डवेयर लर्नर' } },
  { level: 4, icon: '🔌', xp: 560, name: { en: 'Electronics Explorer', gu: 'ઇલેક્ટ્રોનિક્સ એક્સપ્લોરર', hi: 'इलेक्ट्रॉनिक्स एक्सप्लोरर' } },
  { level: 5, icon: '⚡', xp: 900, name: { en: 'Circuit Builder', gu: 'સર્કિટ બિલ્ડર', hi: 'सर्किट बिल्डर' } },
  { level: 6, icon: '🛠️', xp: 1350, name: { en: 'Junior Technician', gu: 'જુનિયર ટેકનિશિયન', hi: 'जूनियर टेक्नीशियन' } },
  { level: 7, icon: '🧑‍🔧', xp: 1900, name: { en: 'Repair Specialist', gu: 'રિપેર સ્પેશિયાલિસ્ટ', hi: 'रिपेयर स्पेशलिस्ट' } },
  { level: 8, icon: '🌐', xp: 2600, name: { en: 'Network Engineer', gu: 'નેટવર્ક એન્જિનિયર', hi: 'नेटवर्क इंजीनियर' } },
  { level: 9, icon: '🤖', xp: 3450, name: { en: 'Robotics Engineer', gu: 'રોબોટિક્સ એન્જિનિયર', hi: 'रोबोटिक्स इंजीनियर' } },
  { level: 10, icon: '👑', xp: 4500, name: { en: 'Technology Master', gu: 'ટેકનોલોજી માસ્ટર', hi: 'टेक्नोलॉजी मास्टर' } },
];

export const levelFromXp = (xp: number): number => {
  let level = 1;
  for (const r of RANKS) if (xp >= r.xp) level = r.level;
  return level;
};

export const xpForLevel = (level: number): number => LEVEL_XP[Math.min(level, 10) - 1] ?? 0;

export interface AchievementDef {
  id: string;
  icon: string;
  name: Tri;
  desc: Tri;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-step',
    icon: '🎓',
    name: { en: 'First Step', gu: 'પ્રથમ પગલું', hi: 'पहला कदम' },
    desc: { en: 'Complete your first lesson', gu: 'તમારો પ્રથમ પાઠ પૂર્ણ કરો', hi: 'अपना पहला पाठ पूरा करें' },
  },
  {
    id: 'learner-ten',
    icon: '📚',
    name: { en: 'Curious Mind', gu: 'જિજ્ઞાસુ મન', hi: 'जिज्ञासु मन' },
    desc: { en: 'Complete 10 lessons', gu: '10 પાઠ પૂર્ણ કરો', hi: '10 पाठ पूरे करें' },
  },
  {
    id: 'learner-thirty',
    icon: '🧠',
    name: { en: 'Knowledge Seeker', gu: 'જ્ઞાન શોધક', hi: 'ज्ञान साधक' },
    desc: { en: 'Complete 30 lessons', gu: '30 પાઠ પૂર્ણ કરો', hi: '30 पाठ पूरे करें' },
  },
  {
    id: 'quiz-perfect',
    icon: '💯',
    name: { en: 'Perfect Answer', gu: 'સંપૂર્ણ જવાબ', hi: 'सही जवाब' },
    desc: { en: 'Score 100% in a quiz', gu: 'ક્વિઝમાં 100% મેળવો', hi: 'क्विज़ में 100% पाएँ' },
  },
  {
    id: 'world-clear',
    icon: '🏁',
    name: { en: 'World Cleared', gu: 'વર્લ્ડ પૂર્ણ', hi: 'वर्ल्ड पूरा' },
    desc: { en: 'Finish every lesson in one world', gu: 'એક વર્લ્ડના બધા પાઠ પૂરા કરો', hi: 'एक वर्ल्ड के सभी पाठ पूरे करें' },
  },
  {
    id: 'pc-builder',
    icon: '🖥️',
    name: { en: 'PC Builder', gu: 'PC બિલ્ડર', hi: 'PC बिल्डर' },
    desc: { en: 'Boot a virtual computer you built', gu: 'તમે બનાવેલું વર્ચ્યુઅલ કમ્પ્યુટર ચાલુ કરો', hi: 'अपना वर्चुअल कंप्यूटर बूट करें' },
  },
  {
    id: 'circuit-builder',
    icon: '⚡',
    name: { en: 'Circuit Builder', gu: 'સર્કિટ બિલ્ડર', hi: 'सर्किट बिल्डर' },
    desc: { en: 'Light an LED in the Circuit Lab', gu: 'સર્કિટ લેબમાં LED ચાલુ કરો', hi: 'सर्किट लैब में LED जलाएँ' },
  },
  {
    id: 'technician',
    icon: '🛠️',
    name: { en: 'Junior Technician', gu: 'જુનિયર ટેકનિશિયન', hi: 'जूनियर टेक्नीशियन' },
    desc: { en: 'Solve 5 repair cases', gu: '5 રિપેર કેસ ઉકેલો', hi: '5 रिपेयर केस हल करें' },
  },
  {
    id: 'gamer',
    icon: '🎮',
    name: { en: 'Mini Game Star', gu: 'મિની ગેમ સ્ટાર', hi: 'मिनी गेम स्टार' },
    desc: { en: 'Score 100+ in a mini game', gu: 'મિની ગેમમાં 100+ સ્કોર કરો', hi: 'मिनी गेम में 100+ स्कोर करें' },
  },
  {
    id: 'tech-master',
    icon: '👑',
    name: { en: 'Technology Master', gu: 'ટેકનોલોજી માસ્ટર', hi: 'टेक्नोलॉजी मास्टर' },
    desc: { en: 'Reach level 10', gu: 'લેવલ 10 પર પહોંચો', hi: 'लेवल 10 तक पहुँचें' },
  },
];

export interface AchievementInput {
  lessonsDone: string[];
  quizzes: Record<string, number>;
  worldsDone: string[];
  repairsDone: string[];
  buildsDone: number;
  circuitsDone: number;
  bestScore: number;
  level: number;
}

export function evaluateAchievements(p: AchievementInput): string[] {
  const has = (id: string) => p.lessonsDone.includes(id);
  const done: string[] = [];
  if (p.lessonsDone.length >= 1) done.push('first-step');
  if (p.lessonsDone.length >= 10) done.push('learner-ten');
  if (p.lessonsDone.length >= 30) done.push('learner-thirty');
  if (Object.values(p.quizzes).some((v) => v >= 100)) done.push('quiz-perfect');
  if (p.worldsDone.length >= 1) done.push('world-clear');
  if (p.buildsDone >= 1) done.push('pc-builder');
  if (p.circuitsDone >= 1) done.push('circuit-builder');
  if (p.repairsDone.length >= 5) done.push('technician');
  if (p.bestScore >= 100) done.push('gamer');
  if (p.level >= 10) done.push('tech-master');
  return done.filter((id, i, a) => a.indexOf(id) === i).filter((id) => has(id) || true);
}

export const TOTAL_LESSONS = ALL_LESSONS.length;
