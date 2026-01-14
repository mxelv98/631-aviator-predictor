
export interface VIPFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export interface Prediction {
  time: string;
  match: string;
  probability: number;
  type: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
