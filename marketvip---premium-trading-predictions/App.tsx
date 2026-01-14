
import React, { useState } from 'react';
import { AppState } from './types';
import PricingCard from './components/PricingCard';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.PRICING);

  const handleSubscribe = () => {
    // In a real app, this would trigger a payment gateway
    setCurrentStep(AppState.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] selection:bg-black selection:text-white flex flex-col items-center justify-center p-4 md:p-8">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10"></div>

      {currentStep === AppState.PRICING && (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <PricingCard onSubscribe={handleSubscribe} />
        </div>
      )}

      {currentStep === AppState.DASHBOARD && (
        <Dashboard />
      )}

      {/* Footer Branding */}
      <footer className="mt-12 text-gray-400 text-xs font-bold uppercase tracking-widest text-center">
        &copy; {new Date().getFullYear()} MarketVIP Premium Intelligence
      </footer>
    </div>
  );
};

export default App;
