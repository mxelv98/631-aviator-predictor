import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictorCard from './components/PredictorCard';
import { getPrediction } from './services/geminiService';
import { AppStatus } from './types';

import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import VIP from './components/VIP';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import { useLanguage } from './context/LanguageContext';
import useSound from './hooks/useSound';

type ViewState = 'home' | 'profile' | 'vip' | 'settings' | 'about';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const { t, dir } = useLanguage();
  const playClick = useSound();
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [view, setView] = useState<ViewState>('home');

  // Countdown timer logic
  useEffect(() => {
    let timer: any;
    if (status === AppStatus.PREDICTED && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && status === AppStatus.PREDICTED) {
      setStatus(AppStatus.EXPIRED);
    }
    return () => clearInterval(timer);
  }, [status, seconds]);

  const handlePredict = async () => {
    playClick();
    // VIP Check simulation
    alert(t('vipPrompt') || 'You need VIP access to use this feature.');
    setView('vip');
    return;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none" dir={dir}>
      <Header
        onProfileClick={() => setView('profile')}
        onVipClick={() => setView('vip')}
        onSettingsClick={() => setView('settings')}
        onAboutClick={() => setView('about')}
      />

      {view === 'profile' ? (
        <Profile onBack={() => setView('home')} />
      ) : view === 'vip' ? (
        <VIP onBack={() => setView('home')} />
      ) : view === 'settings' ? (
        <Settings onBack={() => setView('home')} />
      ) : view === 'about' ? (
        <AboutUs onBack={() => setView('home')} />
      ) : (
        <main className="flex-grow flex flex-col items-center justify-start pt-16 pb-12 px-4 md:px-6">
          <section className="text-center space-y-2 mb-10" data-purpose="title-section">
            <h1 className="text-6xl md:text-8xl font-black leading-none bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              1631
            </h1>
            <h2 className="text-2xl md:text-5xl font-black text-black tracking-tighter uppercase drop-shadow-sm">
              {t('appTitle') || 'Aviator Crash Predictor'}
            </h2>
          </section>

          <div className="relative group" data-purpose="action-area">
            <button
              onClick={handlePredict}
              disabled={status === AppStatus.LOADING}
              className={`
                bg-black text-white text-3xl md:text-5xl font-black py-4 px-20 rounded-full border-black shadow-neubrutalist 
                hover:translate-y-1 hover:shadow-neubrutalist-sm active:translate-y-2 active:shadow-none 
                transition-all duration-150 ease-in-out border-[3px] 
                ${status === AppStatus.LOADING ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {status === AppStatus.LOADING ? t('analyzing') : t('predict')}
            </button>

            {status === AppStatus.EXPIRED && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 border-2 border-red-600 px-4 py-1 rounded-full text-sm font-bold animate-bounce">
                {t('expired') || 'Expired! Try again'}
              </div>
            )}
          </div>

          <PredictorCard
            multiplier={multiplier}
            seconds={seconds}
            isLoading={status === AppStatus.LOADING}
          />

          <div className="mt-auto pt-12 text-center text-gray-400 font-bold max-w-md">
            <p className="text-sm">
              {t('playResponsibly') || '1631 AI Predictor. Play Responsibly.'}
            </p>
          </div>
        </main>
      )}

      {/* Decorations */}
      <div className="fixed bottom-4 left-4 hidden md:block opacity-20 transform rotate-12">
        <div className="w-20 h-20 bg-custom-pink border-[3px] border-black shadow-neubrutalist"></div>
      </div>
      <div className="fixed top-24 right-4 hidden md:block opacity-20 transform -rotate-6">
        <div className="w-16 h-16 rounded-full bg-custom-green border-[3px] border-black shadow-neubrutalist"></div>
      </div>
    </div>
  );
};

export default App;