import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface LandingPageProps {
    onUpgrade: () => void;
    onOpenChat: () => void;
}

const MobileLandingPage: React.FC<LandingPageProps> = ({ onUpgrade, onOpenChat }) => {
    const { user } = useAuth();
    const userId = user?.id?.slice(0, 8) || 'GUEST';

    return (
        <div className="px-6 py-8 flex flex-col h-full bg-[#fdfbf7] font-sans text-black">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <div className="bg-[#ff90e8] border-[3px] border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xl italic rotate-[-2deg]">
                    ID:{userId}
                </div>
                <div className="w-12 h-12 bg-[#ffc900] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"></path>
                    </svg>
                </div>
            </header>

            {/* Hero */}
            <section className="mb-10">
                <h1 className="text-4xl font-black leading-none mb-4 uppercase tracking-tighter italic">
                    AVIATOR <br /> <span className="bg-[#23a6d5] text-white px-2">PREDICTOR</span>
                </h1>
                <p className="font-bold text-lg mb-8 leading-tight">
                    Unlock the secrets of the crash with high-precision AI signals.
                </p>
                <button
                    onClick={onUpgrade}
                    className="w-full bg-[#ff90e8] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xl py-4 uppercase tracking-widest active:translate-y-1 active:shadow-none transition-all"
                >
                    Get VIP Access
                </button>
            </section>

            {/* Locked Feature */}
            <section className="bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 relative">
                <div className="absolute -top-4 -right-2 bg-[#ffc900] border-[2px] border-black px-2 py-1 text-[10px] font-black uppercase rotate-3">
                    Locked
                </div>
                <h3 className="font-black text-lg mb-2 uppercase">Predictions</h3>
                <div className="flex flex-col items-center py-4 border-[2px] border-dashed border-gray-300 bg-gray-50">
                    <svg className="mb-2" fill="none" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                        <rect height="11" rx="2" stroke="black" strokeWidth="3" width="18" x="3" y="11"></rect>
                        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="black" strokeWidth="3"></path>
                    </svg>
                    <button onClick={onUpgrade} className="font-black text-[#23a6d5] underline decoration-[3px]">
                        UPGRADE NOW
                    </button>
                </div>
            </section>

            {/* Why VIP */}
            <section className="mb-10">
                <h3 className="font-black text-xl mb-4 uppercase">Why go VIP?</h3>
                <ul className="space-y-4">
                    <FeatureItem label="95% Accuracy AI" color="bg-[#00ff94]" />
                    <FeatureItem label="Live Admin Signals" color="bg-[#23a6d5]" />
                    <FeatureItem label="Priority Server Access" color="bg-[#ffc900]" />
                </ul>
            </section>

            {/* Footer */}
            <footer className="mt-auto">
                <button
                    onClick={onOpenChat}
                    className="w-full bg-black text-white font-black py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase active:translate-y-1 active:shadow-none transition-all"
                >
                    Talk to AI Strategist
                </button>
            </footer>
        </div>
    );
};

const FeatureItem: React.FC<{ label: string, color: string }> = ({ label, color }) => (
    <li className="flex items-center space-x-4">
        <div className={`w-8 h-8 ${color} border-[3px] border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
            ✓
        </div>
        <span className="font-black uppercase text-sm tracking-tight">{label}</span>
    </li>
);

export default MobileLandingPage;
