
export interface Feature {
  id: number;
  icon: string;
  text: string;
}

export enum AppState {
  PRICING = 'PRICING',
  DASHBOARD = 'DASHBOARD'
}

export interface PredictionResult {
  symbol: string;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  reasoning: string;
  confidence: number;
}
