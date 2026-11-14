export type View =
  | 'language'
  | 'home'
  | 'map'
  | 'world'
  | 'lesson'
  | 'learning'
  | 'lab'
  | 'games'
  | 'daily'
  | 'progress'
  | 'achievements'
  | 'settings'
  | 'about';

export type Go = (view: View, arg?: string) => void;
