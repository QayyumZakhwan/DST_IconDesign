import { SymbolItem } from './types';

export const DST_LOGO_BASE64 = 'data:image/png;base64,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';

export const COLORS: string[] = [
  '#440099', // DST Purple (Primary)
  '#B2D007', // DST Lime (Secondary Light)
  '#E63946', // Coral Red
  '#2196F3', // Ocean Blue
  '#FF9800', // Amber Orange
  '#1DB954', // Spotify Green
  '#E91E8C', // Magenta Pink
  '#00ACC1', // Cyan Teal
  '#282829', // Dark Slate
  '#F4B400', // Sunny Gold
];

export const SYMBOLS: SymbolItem[] = [
  { id: 'phone',   en: 'Calls',     path: 'M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1-.24 1.1.4 2.3.6 3.6.6.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.6 10.8z' },
  { id: 'wifi',    en: 'WiFi',      path: 'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z' },
  { id: 'tv',      en: 'Stream',    path: 'M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z' },
  { id: 'receipt', en: 'Bill Pay',  path: 'M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v20l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5V2l-1.5 1.5zM18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z' },
  { id: 'wallet',  en: 'e-Wallet',  path: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V9H12v7zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' },
  { id: 'chart',   en: 'Usage',     path: 'M5 20h14v2H5v-2zM5 10h2v9H5v-9zm4-3h2v12H9V7zm4 5h2v7h-2v-7zm4-6h2v13h-2V6z' },
  { id: 'star',    en: 'Rewards',   path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
  { id: 'globe',   en: 'Roaming',   path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  { id: 'qr',      en: 'QR Pay',    path: 'M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm-2 2h-2v4h2v-2h2v-2h-2zm2 4h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zM3 21h8v-8H3v8zm2-6h4v4H5v-4z' },
  { id: 'shield',  en: 'Security',  path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
  { id: 'people',  en: 'Family',    path: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { id: 'chat',    en: 'Messages',  path: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' },
  { id: 'home',    en: 'HomeFi',    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { id: 'tree',    en: 'GreenDST',  path: 'M12 2L4 14h16L12 2zM10 14h4v6h-4z' },
  { id: 'bulb',    en: 'Ideas',     path: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' },
  { id: 'help',    en: 'Support',   path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' },
];

export const STORAGE_KEY = 'dst-icon-game-v1';
export const BROADCAST_CHANNEL_NAME = 'dst-icon-game';
