export enum AppState {
  IDLE = 'IDLE',
  SUSPENSE = 'SUSPENSE', // Shaking
  OPENING = 'OPENING',   // Explosion
  REVEALED = 'REVEALED', // Modal Open
}

export interface GiftData {
  title: string;
  description: string;
  qrValue: string;
}
