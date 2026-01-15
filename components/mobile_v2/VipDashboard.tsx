
import React, { useState, useEffect } from 'react';
import { User, Prediction, AiSignal } from './types';
import { ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { getVipPrediction } from '../../services/geminiService';

interface VipDashboardProps {
    user: User;
    onScanPerformed: () => void;
    onUpgradeV3: () => void;
    onUpgradeV6: () => void;
    onBack: () => void;
    onOpenChat: () => void;
    onOpenAccount: () => void;
}

const VipDashboard: React.FC<VipDashboardProps> = ({ user, onScanPerformed, onUpgradeV3, onUpgradeV6, onBack, onOpenChat, onOpenAccount }) => {
    const [history, setHistory] = useState<Prediction[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [currentSignal, setCurrentSignal] = useState<AiSignal | null>(null);
    const [metrics, setMetrics] = useState({ latency: 12, load: 42, sync: 98 });
    const [logs, setLogs] = useState<string[]>([`KERNEL_AUTH: V${user.version.split(' ')[1]} session established.`, "NETWORK_STATE: High Reliability."]);
    const [timeLeft, setTimeLeft] = useState<string>('');

    const isElite = user.version === '1631 6v';
    const brandColor = isElite ? '#f59e0b' : '#0ea5e9';
    const isFreeV3LimitReached = !isElite && !user.isV3Paid && user.scansCount >= 2;

    // Timer Logic
    useEffect(() => {
        if (!user.vipExpiry) return;
        const interval = setInterval(() => {
            const end = new Date(user.vipExpiry!).getTime();
            const now = Date.now();
            const diff = end - now;
            if (diff <= 0) {
                setTimeLeft('00:00:00');
            } else {
                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [user.vipExpiry]);

    // Real-time metric fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                latency: Math.floor(8 + Math.random() * 8),
                load: Math.floor(35 + Math.random() * 15),
                sync: 97 + Math.floor(Math.random() * 3)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const seedData = Array.from({ length: 50 }, (_, i) => ({
            id: i.toString(),
            timestamp: i.toString(),
            multiplier: Number((1 + Math.random() * 3 + Math.sin(i / 4) * 1.5).toFixed(2)),
            confidence: 80 + Math.random() * 15,
        }));
        setHistory(seedData);
    }, []);

    const runAnalysis = async () => {
        // ... (keep existing runAnalysis)
        if (isAnalyzing || isFreeV3LimitReached) return;
        setIsAnalyzing(true);
        setAnalysisProgress(0);
        setCurrentSignal(null);

        const terminalSteps = isElite
            ? ["HANDSHAKE: Elite Encrypted Channel...", "SCAN: Deep Cluster Topology Map...", "ALGO: Quantum Pattern Identification...", "PROC: Validating Neural Thresholds...", "SIGNAL: Precise Sequence Locked."]
            : ["SYNC: Base Channel Established...", "SCAN: Fetching Recent History...", "PROC: Applying AI Logic...", "SIGNAL: Result Generated."];

        for (let i = 0; i < terminalSteps.length; i++) {
            setLogs(prev => [`>>> ${terminalSteps[i]}`, ...prev].slice(0, 8));
            await new Promise(r => setTimeout(r, isElite ? 300 : 600));
            setAnalysisProgress(((i + 1) / terminalSteps.length) * 100);
        }

        const signal = await getVipPrediction();
        setCurrentSignal(signal);
        onScanPerformed();
        setHistory(prev => [...prev.slice(1), {
            id: Date.now().toString(),
            timestamp: 'NOW',
            multiplier: signal.predictedMultiplier,
            confidence: signal.confidence,
            isAiGenerated: true
        }]);
        setIsAnalyzing(false);
    };

    return (
        <div className={`flex flex-col h-full font-sans transition-all duration-1000 ${isElite ? 'bg-[#050505]' : 'bg-brand-bg'}`}>
            {/* Visual background layers */}
            <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${isElite ? 'bg-[radial-gradient(circle_at_50%_0%,#f59e0b_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_0%,#0ea5e9_0%,transparent_50%)]'}`}></div>

            <header className={`px-6 py-5 flex items-center justify-between border-b backdrop-blur-2xl z-50 transition-colors ${isElite ? 'border-brand-elite/20 bg-brand-elite/5' : 'border-white/5 bg-slate-900/40'}`}>
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h1 className="text-xl font-black italic tracking-tighter text-white">1631 <span className={isElite ? 'text-brand-elite' : 'text-brand-primary'}>{user.version.split(' ')[1]}</span></h1>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className={`w-1 h-1 rounded-full animate-pulse ${isElite ? 'bg-brand-elite' : 'bg-brand-primary'}`}></span>
                                <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.4em]">Live Kernel authorized</span>
                            </div>
                            {timeLeft && (
                                <span className={`text-[10px] font-mono mt-1 font-black ${isElite ? 'text-brand-elite' : 'text-brand-primary'}`}>ID: {timeLeft}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onOpenChat} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    </button>
                    <button onClick={onOpenAccount} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6 pb-24 relative z-10">

                {/* NETWORK METRICS */}
                <div className="grid grid-cols-3 gap-3 animate-in fade-in duration-700">
                    <MetricBox label="LATENCY" value={`${metrics.latency}ms`} color={brandColor} />
                    <MetricBox label="LOAD" value={`${metrics.load}%`} color={brandColor} />
                    <MetricBox label="SYNC" value={`${metrics.sync}%`} color={brandColor} />
                </div>

                {/* ANALYTICS CARD */}
                <section className={`p-6 rounded-[32px] border transition-all duration-700 relative overflow-hidden ${isElite ? 'bg-brand-elite/5 border-brand-elite/20 pro-shadow' : 'bg-slate-950/50 border-white/5'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Stream</span>
                            <span className="text-xs font-bold text-white uppercase italic">Market Density Waveform</span>
                        </div>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${isElite ? 'text-brand-elite bg-brand-elite/10 border-brand-elite/30' : 'text-brand-primary bg-brand-primary/10 border-brand-primary/30'}`}>
                            PRO_MODE_ACTIVE
                        </span>
                    </div>

                    <div className="h-40 w-full -mx-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={brandColor} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="multiplier" stroke={brandColor} strokeWidth={2.5} fill="url(#chartFill)" animationDuration={2000} />
                                <ReferenceLine y={1.0} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* MAIN ENGINE TERMINAL */}
                <section className={`min-h-[340px] rounded-[48px] p-8 border relative overflow-hidden flex flex-col items-center justify-center transition-all duration-1000 ${isElite ? 'bg-brand-elite/5 border-brand-elite/30 elite-glow' : 'bg-slate-900/20 border-white/10'}`}>
                    {isFreeV3LimitReached ? (
                        <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 max-w-[280px]">
                            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 relative">
                                <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-20"></div>
                                <svg className="text-red-500" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-3 leading-none">Access Terminated</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed mb-10">
                                Free Operational Tokens Exhausted. <br />A 1631 License is required to continue.
                            </p>

                            <div className="w-full space-y-4">
                                <button onClick={onUpgradeV3} className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02]">
                                    Standard License — $56
                                </button>
                                <button onClick={onUpgradeV6} className="w-full py-5 rounded-2xl bg-brand-elite text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-brand-elite/20 transition-all hover:scale-[1.02]">
                                    Neural Elite — $66
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center w-full animate-in zoom-in duration-500">
                                    <div className="relative mb-10">
                                        <div className={`text-8xl font-black italic tracking-tighter ${isElite ? 'text-brand-elite' : 'text-white'}`}>
                                            {Math.floor(analysisProgress)}<span className="text-3xl">%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden max-w-[200px]">
                                        <div className={`h-full transition-all duration-300 ${isElite ? 'bg-brand-elite shadow-[0_0_15px_#f59e0b]' : 'bg-brand-primary shadow-[0_0_15px_#0ea5e9]'}`} style={{ width: `${analysisProgress}%` }}></div>
                                    </div>
                                    <p className={`mt-6 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse ${isElite ? 'text-brand-elite' : 'text-brand-primary'}`}>Kernel Scanning Clusters</p>
                                </div>
                            ) : currentSignal ? (
                                <div className="animate-in zoom-in duration-700 flex flex-col items-center w-full">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${isElite ? 'text-brand-elite' : 'text-slate-500'}`}>Target Sequence Confirmed</span>
                                    <div className="relative group">
                                        {isElite && <div className="absolute -inset-10 bg-brand-elite/10 blur-[80px] rounded-full animate-pulse"></div>}
                                        <div className="flex items-baseline relative z-10">
                                            <span className="text-[140px] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                                                {currentSignal.predictedMultiplier.toFixed(2)}
                                            </span>
                                            <span className={`text-5xl font-black italic -ml-4 ${isElite ? 'text-brand-elite' : 'text-brand-primary'}`}>x</span>
                                        </div>
                                    </div>
                                    <div className="mt-10 flex gap-4">
                                        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                                            <span className="text-[8px] font-black text-slate-500 uppercase mb-1">Confidence</span>
                                            <span className={`text-xl font-black ${isElite ? 'text-brand-elite' : 'text-brand-success'}`}>{isElite ? 99.4 : currentSignal.confidence}%</span>
                                        </div>
                                        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                                            <span className="text-[8px] font-black text-slate-500 uppercase mb-1">Latency</span>
                                            <span className="text-xl font-black text-white/80">0.2ms</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center animate-in fade-in duration-1000">
                                    <div className={`w-32 h-32 rounded-full border flex items-center justify-center mb-10 relative group ${isElite ? 'border-brand-elite/20 bg-brand-elite/5' : 'border-white/5 bg-white/[0.01]'}`}>
                                        <div className={`absolute inset-0 rounded-full border-t-2 animate-spin duration-[2s] ${isElite ? 'border-brand-elite' : 'border-brand-primary'}`}></div>
                                        <svg className={`opacity-20 ${isElite ? 'text-brand-elite' : 'text-white'}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                    </div>
                                    <h3 className="text-base font-black text-white uppercase tracking-[0.4em] italic mb-2">Awaiting deployment</h3>
                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-center max-w-[200px]">Synchronize version {user.version.split(' ')[1]} with market node</p>
                                </div>
                            )}

                            <button
                                onClick={runAnalysis}
                                disabled={isAnalyzing}
                                className={`mt-12 w-full max-w-[320px] py-7 rounded-[40px] font-black text-xs uppercase tracking-[0.5em] transition-all relative overflow-hidden flex items-center justify-center gap-4 group
                   ${isAnalyzing
                                        ? 'bg-slate-900 text-slate-700 border border-white/5 opacity-50'
                                        : isElite
                                            ? 'bg-brand-elite text-black shadow-xl shadow-brand-elite/30 hover:scale-[1.02]'
                                            : 'bg-white text-black hover:bg-brand-primary hover:text-white shadow-xl'
                                    }`}
                            >
                                {isAnalyzing ? "Processing..." : "Deploy Signal"}
                                {!isAnalyzing && <svg className="group-hover:translate-x-2 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                            </button>
                        </div>
                    )}
                </section>

                {/* TERMINAL OUTPUT */}
                <div className={`p-6 rounded-[32px] border font-mono transition-all duration-700 ${isElite ? 'bg-black border-brand-elite/20' : 'bg-black border-white/5'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${isElite ? 'bg-brand-elite' : 'bg-brand-primary'}`}></div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Log output</span>
                    </div>
                    <div className="space-y-1.5 h-32 overflow-hidden flex flex-col-reverse opacity-70">
                        {logs.map((log, i) => (
                            <div key={i} className={`text-[10px] ${i === 0 ? (isElite ? 'text-brand-elite' : 'text-brand-primary') : 'text-slate-600'}`}>
                                <span className="opacity-30 mr-3">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* PRO NAV BAR */}
            <nav className="fixed bottom-0 left-0 right-0 p-6 z-[60] flex justify-center pointer-events-none">
                <div className={`w-full max-w-[360px] h-16 rounded-[28px] border backdrop-blur-3xl p-1 flex justify-around items-center pointer-events-auto shadow-2xl ${isElite ? 'bg-brand-elite/5 border-brand-elite/20' : 'bg-slate-950/80 border-white/10'}`}>
                    <NavButton label="SCAN" active brandColor={brandColor} />
                    <div className="w-[1px] h-6 bg-white/5"></div>
                    <NavButton label="NETWORK" brandColor={brandColor} />
                    <div className="w-[1px] h-6 bg-white/5"></div>
                    <NavButton label="SECURE" brandColor={brandColor} />
                </div>
            </nav>
        </div>
    );
};

const MetricBox = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-3 flex flex-col items-center group hover:border-white/10 transition-colors">
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 group-hover:text-slate-400">{label}</span>
        <span className="text-xs font-black" style={{ color }}>{value}</span>
    </div>
);

const NavButton = ({ label, active, brandColor }: { label: string, active?: boolean, brandColor: string }) => (
    <button className="flex flex-col items-center justify-center flex-1 py-2 group">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${active ? '' : 'text-slate-500 group-hover:text-slate-300'}`} style={{ color: active ? brandColor : undefined }}>
            {label}
        </span>
        {active && <div className="w-6 h-[2px] rounded-full mt-1.5" style={{ backgroundColor: brandColor, boxShadow: `0 0 10px ${brandColor}` }}></div>}
    </button>
);

export default VipDashboard;
