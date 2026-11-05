export type ScreenType = 'signin' | 'build' | 'describe' | 'confirm' | 'gallery';

export type GenderType = 'Male' | 'Female';

export type IconMode = 'symbol' | 'draw';

export interface SymbolItem {
  id: string;
  en: string;
  path: string;
}

export interface StrokePoint {
  x: number;
  y: number;
}

export interface Stroke {
  pts: StrokePoint[];
  w: number;
  eraser: boolean;
  color: string;
  drawBg: string;
}

export interface IconEntry {
  id: string;
  timestamp: string;
  age: string;
  gender: GenderType;
  accountingExp?: boolean;
  iconColor: string;
  iconSymbols: string[];
  iconLabel: string;
  iconMode: IconMode;
  iconDrawing: string | null;
  desc1: string; // What does your icon do?
  desc2?: string;
  desc3: string; // How does it help MyDST users?
}

export interface GameState {
  screen: ScreenType;
  age: string;
  gender: GenderType;
  accountingExp: boolean;
  iconColor: string;
  iconSymbols: string[];
  iconLabel: string;
  iconMode: IconMode;
  iconDrawing: string | null;
  brushSize: number;
  drawTool: 'pen' | 'eraser';
  drawColor: string;
  desc1: string;
  desc2: string;
  desc3: string;
}
