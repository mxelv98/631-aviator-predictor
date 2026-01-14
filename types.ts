
export interface Prediction {
  multiplier: number;
  secondsRemaining: number;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PREDICTED = 'PREDICTED',
  EXPIRED = 'EXPIRED'
}
