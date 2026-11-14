export type Lang = 'en' | 'gu' | 'hi';
export type Tri = Record<Lang, string>;

export const LANGS: { id: Lang; label: string; native: string; flag: string; voice: string }[] = [
  { id: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🪔', voice: 'gu-IN' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🪷', voice: 'hi-IN' },
  { id: 'en', label: 'English', native: 'English', flag: '🌐', voice: 'en-US' },
];

export type ModelKind =
  | 'cpu'
  | 'ram'
  | 'rom'
  | 'motherboard'
  | 'hdd'
  | 'ssd'
  | 'gpu'
  | 'psu'
  | 'fan'
  | 'heatsink'
  | 'case'
  | 'keyboard'
  | 'mouse'
  | 'monitor'
  | 'usb'
  | 'hdmi'
  | 'bios'
  | 'os'
  | 'input'
  | 'output'
  | 'resistor'
  | 'capacitor'
  | 'diode'
  | 'led'
  | 'transistor'
  | 'inductor'
  | 'relay'
  | 'fuse'
  | 'switch'
  | 'battery'
  | 'motor'
  | 'ic'
  | 'breadboard'
  | 'sensor'
  | 'wire'
  | 'connector'
  | 'router'
  | 'modem'
  | 'ethernet'
  | 'netswitch'
  | 'ip'
  | 'wifi'
  | 'lan'
  | 'robot'
  | 'microcontroller'
  | 'servo'
  | 'ai'
  | 'iot'
  | 'cloud'
  | 'security'
  | 'architecture'
  | 'automation';

export interface Quiz {
  q: Tri;
  options: Tri[];
  correct: number;
}

export interface Lesson {
  id: string;
  name: string;
  model: ModelKind;
  emoji: string;
  def: Tri;
  func: Tri;
  principle: Tri;
  uses: Tri;
  examples: Tri;
  quiz: Quiz;
}

export interface World {
  id: string;
  index: number;
  title: Tri;
  subtitle: Tri;
  mission: Tri;
  emoji: string;
  color: string;
  accent: string;
  kind: 'lessons' | 'pcbuild' | 'circuit' | 'repair' | 'network' | 'robot' | 'future';
  unlockLevel: number;
  lessonIds: string[];
  xp: number;
}
