
export interface Prediction {
  id: string;
  timestamp: string;
  multiplier: number;
  confidence: number;
  isAiGenerated?: boolean;
}

export interface AiSignal {
  predictedMultiplier: number;
  confidence: number;
  reasoning: string;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  isVip: boolean; // This represents 6v Elite status
  isV3Paid: boolean; // This represents paid 3v access ($56/3d)
  scansCount: number;
  version: '1631 3v' | '1631 6v';
  language: string;
}

export enum AppState {
  LOGIN = 'LOGIN',
  LANDING = 'LANDING',
  VIP_DASHBOARD = 'VIP_DASHBOARD',
  AI_CHAT = 'AI_CHAT',
  ACCOUNT = 'ACCOUNT',
  ABOUT = 'ABOUT'
}
