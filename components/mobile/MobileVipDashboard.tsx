import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';

interface VipDashboardProps {
    onBack: () => void;
    onOpenChat: () => void;
}

const MobileVipDashboard: React.FC<VipDashboardProps> = ({ onBack, onOpenChat }) => {
    const [predictions, setPredictions] = useState<any[]>([]);
    const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
    const [isFlying, setIsFlying] = useState(true);

    useEffect(() => {
        // Initial dummy data
        const initialData = Array.from({ length: 12 }, (_, i) => ({
            id: i.toString(),
            timestamp: new Date(Date.now() - (12 - i) * 10000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            multiplier: Number((Math.random() * 4 + 1).toFixed(2)),
        }));
        setPredictions(initialData);
    }, []);

    // Simple animation simulation
    useEffect(() => {
        let interval: any;
        if (isFlying) {
            interval = setInterval(() => {
                setCurrentMultiplier(prev => {
                    if (prev > 3.5 || Math.random() > 0.99) {
                        setIsFlying(false);
                        return prev;
                    }
                    return prev + 0.05;
                });
            }, 100);
        } else {
            setTimeout(() => {
                setCurrentMultiplier(1.0);
                setIsFlying(true);
                setPredictions(prev => [...prev.slice(1), {
                    id: Date.now().toString(),
                    timestamp: new Date().toLocaleTimeString(),
                    multiplier: Number(currentMultiplier.toFixed(2))
                }]);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isFlying, currentMultiplier]);

    return (
        <div className="flex flex-col h-full bg-[#fdfbf7] overflow-y-auto font-sans text-black">
            {/* Header */}
            <header className="p-4 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-20">
                <button onClick={onBack} className="bg-[#23a6d5] border-[3px] border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase active:translate-y-1 active:shadow-none transition-all text-white">
                    Back
                </button>
                <div className="font-black text-sm uppercase tracking-tighter">
                    VIP Dashboard
                </div>
                <div className="w-8 h-8 bg-[#ff90e8] border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
            </header>

            {/* AI RESULT */}
            <section className="p-6">
                <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-black text-[10px] uppercase">
                        Direct AI Signal
                    </div>

                    <div className="text-center">
                        <h2 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">Target Result</h2>
                        <div className="text-6xl font-black italic tracking-tighter mb-4">
                            {(currentMultiplier * 1.5).toFixed(2)}<span className="text-4xl text-[#ff90e8]">x</span>
                        </div>

                        <div className="flex justify-between items-center bg-[#ffc900]/20 border-[2px] border-black p-3 mb-4">
                            <span className="font-black text-[10px] uppercase">Confidence</span>
                            <span className="font-black text-xl">94%</span>
                        </div>

                        <p className="text-xs font-bold leading-tight uppercase italic text-left">
                            "Strong accumulation detected. Prepared for high multiplier takeoff."
                        </p>
                    </div>
                </div>
            </section>

            {/* Chart */}
            <section className="px-6 mb-8">
                <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-black text-xs uppercase tracking-widest">Live Market</div>
                        <div className={`px-2 py-1 border-[2px] border-black font-black text-[10px] uppercase ${isFlying ? 'bg-[#00ff94]' : 'bg-red-500 text-white'}`}>
                            {isFlying ? 'Active' : 'Crashed'}
                        </div>
                    </div>

                    <div className="h-40 w-full mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={predictions}>
                                <CartesianGrid strokeDasharray="0" stroke="#000" strokeWidth={1} vertical={false} opacity={0.1} />
                                <XAxis dataKey="timestamp" hide />
                                <YAxis hide domain={[0, 'auto']} />
                                <Area
                                    type="monotone"
                                    dataKey="multiplier"
                                    stroke="#000"
                                    strokeWidth={4}
                                    fill="#ff90e8"
                                    fillOpacity={0.8}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-center py-2 border-t-[2px] border-black">
                        <div className="text-5xl font-black italic tabular-nums">
                            {currentMultiplier.toFixed(2)}x
                        </div>
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="px-6 pb-24">
                <h3 className="font-black text-xl uppercase italic mb-4">Recent Signals</h3>
                <div className="space-y-4">
                    {predictions.slice().reverse().map((p: any) => (
                        <div key={p.id} className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex justify-between items-center">
                            <div>
                                <div className="text-[10px] font-black uppercase text-gray-400">{p.timestamp}</div>
                                <div className="text-2xl font-black italic">{p.multiplier.toFixed(2)}x</div>
                            </div>
                            <div className="text-right">
                                <div className={`px-3 py-1 border-[2px] border-black font-black text-[10px] uppercase ${p.multiplier > 2 ? 'bg-[#00ff94]' : 'bg-[#ffc900]'}`}>
                                    {p.multiplier > 2 ? 'High Profit' : 'Stable'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAB */}
            <div className="fixed bottom-6 right-6 z-30">
                <button
                    onClick={onOpenChat}
                    className="w-16 h-16 bg-[#ff90e8] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rounded-none active:translate-y-1 active:shadow-none transition-all"
                >
                    <div className="font-black text-sm">AI</div>
                </button>
            </div>
        </div>
    );
};

export default MobileVipDashboard;
