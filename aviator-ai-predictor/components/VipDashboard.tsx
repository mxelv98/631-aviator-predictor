
import React, { useState, useEffect } from 'react';
import { User, Prediction, AiSignal } from '../types';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getVipPrediction } from '../services/geminiService';

interface VipDashboardProps {
  user: User;
  onBack: () => void;
  onOpenChat: () => void;
}

const VipDashboard: React.FC<VipDashboardProps> = ({ user, onBack, onOpenChat }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(true);
  const [nextAiSignal, setNextAiSignal] = useState<AiSignal | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const initialData: Prediction[] = Array.from({ length: 12 }, (_, i) => ({
      id: i.toString(),
      timestamp: new Date(Date.now() - (12 - i) * 10000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      multiplier: Number((Math.random() * 4 + 1).toFixed(2)),
      confidence: Math.random() * 10 + 85,
    }));
    setPredictions(initialData);
    fetchNextSignal();
  }, []);

  const fetchNextSignal = async () => {
    setIsAnalyzing(true);
    const signal = await getVipPrediction();
    setNextAiSignal(signal);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    let interval: number;
    if (isFlying) {
      interval = window.setInterval(() => {
        setCurrentMultiplier(prev => {
          const next = prev + 0.01 + (prev * 0.005);
          const threshold = nextAiSignal?.predictedMultiplier || 2.5;
          if (next > 1.1 && Math.random() < (next > threshold ? 0.25 : 0.008)) {
            setIsFlying(false);
            return next;
          }
          return next;
        });
      }, 100);
    } else {
      const timer = window.setTimeout(() => {
        setPredictions(prev => [...prev.slice(1), {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          multiplier: Number(currentMultiplier.toFixed(2)),
          confidence: nextAiSignal?.confidence || 90,
          isAiGenerated: true
        }]);
        setCurrentMultiplier(1.0);
        fetchNextSignal();
        setIsFlying(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [isFlying, nextAiSignal, currentMultiplier]);

  return (
    <div className="flex flex-col h-full bg-gum-beige overflow-y-auto hide-scrollbar">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-20">
        <button onClick={onBack} className="neo-button bg-gum-blue border-[3px] border-black px-4 py-1 shadow-neo font-black text-xs uppercase">
          Back
        </button>
        <div className="font-black text-sm uppercase tracking-tighter">
          VIP Dashboard
        </div>
        <div className="w-8 h-8 bg-gum-pink border-[3px] border-black shadow-neo-sm"></div>
      </header>

      {/* AI RESULT - THE MAIN FOCUS */}
      <section className="p-6">
        <div className="bg-white border-[3px] border-black shadow-neo-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-black text-[10px] uppercase">
            Direct AI Signal
          </div>
          
          <div className="text-center">
            <h2 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">Target Result</h2>
            <div className={`text-8xl font-black italic tracking-tighter mb-4 ${isAnalyzing ? 'animate-pulse opacity-30' : 'text-black'}`}>
              {nextAiSignal ? nextAiSignal.predictedMultiplier.toFixed(2) : '0.00'}<span className="text-4xl text-gum-pink">x</span>
            </div>
            
            <div className="flex justify-between items-center bg-gum-yellow/20 border-[2px] border-black p-3 mb-4">
              <span className="font-black text-[10px] uppercase">Confidence</span>
              <span className="font-black text-xl">{nextAiSignal?.confidence || 0}%</span>
            </div>

            <p className="text-xs font-bold leading-tight uppercase italic text-left">
              "{nextAiSignal?.reasoning || 'Calculating high-volatility trends...'}"
            </p>
          </div>
        </div>
      </section>

      {/* Live Chart Container */}
      <section className="px-6 mb-8">
        <div className="bg-white border-[3px] border-black shadow-neo p-4">
           <div className="flex justify-between items-center mb-4">
             <div className="font-black text-xs uppercase tracking-widest">Live Market</div>
             <div className={`px-2 py-1 border-[2px] border-black font-black text-[10px] uppercase ${isFlying ? 'bg-gum-green' : 'bg-red-500 text-white'}`}>
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
                  animationDuration={1500}
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
          {predictions.slice().reverse().map((p) => (
            <div key={p.id} className="bg-white border-[3px] border-black shadow-neo p-4 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-black uppercase text-gray-400">{p.timestamp}</div>
                <div className="text-2xl font-black italic">{p.multiplier.toFixed(2)}x</div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 border-[2px] border-black font-black text-[10px] uppercase ${p.multiplier > 2 ? 'bg-gum-green' : 'bg-gum-yellow'}`}>
                  {p.multiplier > 2 ? 'High Profit' : 'Stable'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom FAB */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={onOpenChat}
          className="neo-button w-16 h-16 bg-gum-pink border-[3px] border-black shadow-neo flex items-center justify-center group"
        >
          <svg className="group-hover:rotate-12 transition-transform" fill="black" height="32" viewBox="0 0 24 24" width="32">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VipDashboard;
