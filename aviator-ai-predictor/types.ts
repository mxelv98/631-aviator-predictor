
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
  isVip: boolean;
}

export enum AppState {
  LANDING = 'LANDING',
  VIP_DASHBOARD = 'VIP_DASHBOARD',
  AI_CHAT = 'AI_CHAT'
}
