
import React from 'react';
import { User } from './types';
import { Crown, Zap, Shield, Clock } from 'lucide-react';

interface SubscriptionPageProps {
    user: User;
    onSelectPlan: (plan: 'core_v3' | 'elite_v6') => void;
    onBack: () => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ user, onSelectPlan, onBack }) => {
    return (
        <div className="h-full flex flex-col bg-brand-bg text-white relative overflow-hidden">
            {/* Header */}
            <div className="p-6 flex items-center justify-between z-10 relative">
                <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                </button>
                <div className="bg-brand-primary/10 px-4 py-1.5 rounded-full border border-brand-primary/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Select Access Level</span>
                </div>
                <div className="w-10" />
            </div>

            <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-20 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black italic tracking-tighter mb-2">UPGRADE KERNEL</h1>
                    <p className="text-sm text-slate-400">Unlock advanced prediction capabilities.</p>
                </div>

                {/* Core 3.2v Plan */}
                <div className="group relative rounded-[32px] bg-slate-900 border border-white/10 p-1 transition-all hover:border-brand-primary/50">
                    <div className="bg-[#0A0F1C] rounded-[28px] p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Shield className="w-24 h-24 text-brand-primary/5" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-4">
                                <span className="px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">Standard</span>
                                <h2 className="text-4xl font-black italic mt-2">CORE 3.2v</h2>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Clock className="w-4 h-4 text-brand-primary" />
                                    <span>Duration: <strong className="text-white">72 Hours</strong></span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Zap className="w-4 h-4 text-brand-primary" />
                                    <span>Basic Market Analysis</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Shield className="w-4 h-4 text-brand-primary" />
                                    <span>Standard Security</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => onSelectPlan('core_v3')}
                                className="w-full py-4 rounded-xl bg-brand-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-transform"
                            >
                                Activate Access
                            </button>
                        </div>
                    </div>
                </div>

                {/* Elite v6.8 Plan */}
                <div className="group relative rounded-[32px] bg-black border border-brand-elite/30 p-1 transition-all hover:border-brand-elite/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                    <div className="absolute -inset-1 bg-gradient-to-b from-brand-elite/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-[#050505] rounded-[28px] p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Crown className="w-24 h-24 text-brand-elite/5" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="px-3 py-1 rounded-lg bg-brand-elite/10 text-brand-elite text-[10px] font-black uppercase tracking-widest border border-brand-elite/20">Ultimate</span>
                                    <h2 className="text-4xl font-black italic mt-2 text-white">ELITE v6.8</h2>
                                </div>
                                <Crown className="text-brand-elite w-8 h-8 animate-pulse" />
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Clock className="w-4 h-4 text-brand-elite" />
                                    <span>Duration: <strong className="text-white">30 Minutes</strong></span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Zap className="w-4 h-4 text-brand-elite" />
                                    <span>Deep Cluster Predictions</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <Shield className="w-4 h-4 text-brand-elite" />
                                    <span>Priority Network Access</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => onSelectPlan('elite_v6')}
                                className="w-full py-4 rounded-xl bg-brand-elite text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand-elite/20 hover:scale-[1.02] transition-transform"
                            >
                                Activate Elite
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionPage;
