import React from 'react';
import PricingCard from './PricingCard';
import AIAgent from './AIAgent';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

interface VIPProps {
    onBack: () => void;
}

const VIP: React.FC<VIPProps> = ({ onBack }) => {
    const { t } = useLanguage();
    const playClick = useSound();

    const handleBack = () => {
        playClick();
        onBack();
    };

    return (
        <div className="min-h-screen bg-[#fcfdfe] selection:bg-black selection:text-white flex flex-col p-4 md:p-8 font-sans overflow-y-auto relative">
            {/* Decorative Background Elements from MarketVIP */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] -z-10"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10"></div>

            <button
                onClick={handleBack}
                className="self-start mb-8 bg-white text-black font-bold py-2 px-6 border-2 border-black shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all rounded-xl hover:bg-gray-50 z-20"
            >
                ← {t('backToGame')}
            </button>

            {/* Main Content */}
            <main className="flex-grow w-full flex items-center justify-center z-10">
                <div className="animate-in fade-in zoom-in-95 duration-700 w-full">
                    <PricingCard />
                </div>
            </main>

            {/* Footer Branding from MarketVIP */}
            <footer className="mt-12 text-gray-400 text-xs font-bold uppercase tracking-widest text-center">
                &copy; {new Date().getFullYear()} MarketVIP Premium Intelligence
            </footer>

            {/* AI Assistant Floating UI - Keeping this as it's a feature of the main app */}
            <AIAgent />
        </div>
    );
};

export default VIP;
