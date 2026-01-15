
import React from 'react';
import { User } from '../types';

interface LandingPageProps {
  user: User;
  onUpgrade: () => void;
  onOpenChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ user, onUpgrade, onOpenChat }) => {
  return (
    <div className="px-6 py-8 flex flex-col h-full bg-gum-beige">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="bg-gum-pink border-[3px] border-black px-4 py-1 shadow-neo font-black text-xl italic rotate-[-2deg]">
          ID:{user.id}
        </div>
        <div className="w-12 h-12 bg-gum-yellow border-[3px] border-black shadow-neo flex items-center justify-center">
          <svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"></path>
          </svg>
        </div>
      </header>

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-4xl font-black leading-none mb-4 uppercase tracking-tighter italic">
          AVIATOR <br/> <span className="bg-gum-blue text-white px-2">PREDICTOR</span>
        </h1>
        <p className="font-bold text-lg mb-8 leading-tight">
          Unlock the secrets of the crash with high-precision AI signals.
        </p>
        <button 
          onClick={onUpgrade}
          className="neo-button w-full bg-gum-pink border-[3px] border-black shadow-neo font-black text-xl py-4 uppercase tracking-widest"
        >
          Get VIP Access
        </button>
      </section>

      {/* Locked Feature */}
      <section className="bg-white border-[3px] border-black p-6 shadow-neo mb-8 relative">
        <div className="absolute -top-4 -right-2 bg-gum-yellow border-[2px] border-black px-2 py-1 text-[10px] font-black uppercase rotate-3">
          Locked
        </div>
        <h3 className="font-black text-lg mb-2 uppercase">Predictions</h3>
        <div className="flex flex-col items-center py-4 border-[2px] border-dashed border-gray-300 bg-gray-50">
          <svg className="mb-2" fill="none" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
            <rect height="11" rx="2" stroke="black" strokeWidth="3" width="18" x="3" y="11"></rect>
            <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="black" strokeWidth="3"></path>
          </svg>
          <button onClick={onUpgrade} className="font-black text-gum-blue underline decoration-[3px]">
            UPGRADE NOW
          </button>
        </div>
      </section>

      {/* Why VIP */}
      <section className="mb-10">
        <h3 className="font-black text-xl mb-4 uppercase">Why go VIP?</h3>
        <ul className="space-y-4">
          <FeatureItem label="95% Accuracy AI" color="bg-gum-green" />
          <FeatureItem label="Live Admin Signals" color="bg-gum-blue" />
          <FeatureItem label="Priority Server Access" color="bg-gum-yellow" />
        </ul>
      </section>

      {/* Telegram Link */}
      <footer className="mt-auto">
        <a 
          href="#" 
          className="neo-button block text-center bg-black text-white font-black py-4 border-[3px] border-black shadow-neo uppercase"
        >
          Join Telegram
        </a>
      </footer>
    </div>
  );
};

const FeatureItem: React.FC<{ label: string, color: string }> = ({ label, color }) => (
  <li className="flex items-center space-x-4">
    <div className={`w-8 h-8 ${color} border-[3px] border-black flex items-center justify-center font-black shadow-neo-sm`}>
      ✓
    </div>
    <span className="font-black uppercase text-sm tracking-tight">{label}</span>
  </li>
);

export default LandingPage;
