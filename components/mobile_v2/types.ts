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
    version: string;
    language: string;
    vipExpiry?: string;
    planType?: 'elite_v6' | 'core_v3';
}

export enum AppState {
    LOGIN = 'LOGIN',
    LANDING = 'LANDING',
    VIP_DASHBOARD = 'VIP_DASHBOARD',
    AI_CHAT = 'AI_CHAT',
    ACCOUNT = 'ACCOUNT',
    ABOUT = 'ABOUT',
    SUBSCRIPTION = 'SUBSCRIPTION'
}
