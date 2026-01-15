
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

export interface UserSettings {
  user_id: string;
  dark_mode: boolean;
  notifications_enabled: boolean;
  updated_at?: string;
}
