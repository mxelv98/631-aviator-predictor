import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Crown } from 'lucide-react';
import Header from './components/Header';
import PredictorCard from './components/PredictorCard';
import { AppStatus } from './types';

import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import VIP from './components/VIP';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import { useLanguage } from './context/LanguageContext';
import useSound from './hooks/useSound';
import Notifications from './components/Notifications';

// Admin Imports
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserList from './components/admin/UserList';
import Payments from './components/admin/Payments';
import VipManager from './components/admin/VipManager';
import Predictions from './components/admin/Predictions';
import Placeholder from './components/admin/Placeholder';

// MainApp Component Logic Update already includes imports at top level.
// Removing duplicate supabase import inside MainApp or near top.
// The previous edit added it at line 3 AND line 30?
// I will remove the one at line 30.

const MainApp: React.FC = () => {
  const { user, loading } = useAuth();
  const { t, dir } = useLanguage();
  const playClick = useSound();
  const navigate = useNavigate();

  const [status, setStatus] = React.useState<AppStatus>(AppStatus.IDLE);
  const [multiplier, setMultiplier] = React.useState<number | null>(null);
  const [seconds, setSeconds] = React.useState<number>(0);

  // VIP State
  const [isVip, setIsVip] = React.useState(false);
  const [vipExpiry, setVipExpiry] = React.useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      checkVipStatus();
    }
  }, [user]);

  const checkVipStatus = async () => {
    const { data } = await supabase
      .from('vip_subscriptions')
      .select('*')
      .eq('user_id', user?.id)
      .eq('status', 'active')
      .gt('end_time', new Date().toISOString())
      .single();

    if (data) {
      setIsVip(true);
      setVipExpiry(new Date(data.end_time));
    } else {
      setIsVip(false);
    }
  };

  // Countdown timer for prediction (existing)
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

  // Timer for VIP countdown (optional visual)
  useEffect(() => {
    if (vipExpiry) {
      const interval = setInterval(() => {
        if (new Date() > vipExpiry) {
          setIsVip(false);
          setVipExpiry(null);
          // Force navigation or alert if needed
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [vipExpiry]);

  const handlePredict = async () => {
    playClick();
    if (!isVip) {
      // navigate('/vip');
      alert(t('vipPrompt') || 'You need VIP access to use this feature.');
      navigate('/vip');
      return;
    }

    setStatus(AppStatus.LOADING);
    // Simulate prediction (replace with real API if needed)
    setTimeout(() => {
      const randomMultiplier = (Math.random() * 10 + 1).toFixed(2);
      setMultiplier(parseFloat(randomMultiplier));
      setStatus(AppStatus.PREDICTED);
      setSeconds(60); // 1 minute validity
    }, 2000);
  };

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none" dir={dir}>
      <Header
        onProfileClick={() => navigate('/profile')}
        onVipClick={() => navigate('/vip')}
        onSettingsClick={() => navigate('/settings')}
        onAboutClick={() => navigate('/about')}
      />

      <main className="flex-grow flex flex-col items-center justify-start pt-16 pb-12 px-4 md:px-6">
        <section className="text-center space-y-2 mb-10" data-purpose="title-section">
          <h1 className="text-6xl md:text-8xl font-black leading-none bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
            1631
          </h1>
          <h2 className="text-2xl md:text-5xl font-black text-black tracking-tighter uppercase drop-shadow-sm">
            {t('appTitle') || 'Aviator Crash Predictor'}
          </h2>

          {isVip && vipExpiry && (
            <div className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold border border-green-200 inline-block animate-pulse">
              VIP Active: Ends in {Math.ceil((vipExpiry.getTime() - new Date().getTime()) / 60000)}m
            </div>
          )}
        </section>

        <div className="relative group" data-purpose="action-area">
          {/* Primary Button */}
          <button
            onClick={handlePredict}
            disabled={status === AppStatus.LOADING}
            className={`
                            text-3xl md:text-5xl font-black py-4 px-20 rounded-full border-[3px] shadow-neubrutalist 
                            transition-all duration-150 ease-in-out
                            ${isVip
                ? 'bg-black text-white border-black hover:translate-y-1 hover:shadow-neubrutalist-sm active:translate-y-2 active:shadow-none'
                : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'}
                            ${status === AppStatus.LOADING ? 'opacity-70 cursor-wait' : ''}
                        `}
          >
            {status === AppStatus.LOADING ? t('analyzing') : t('predict')}
          </button>

          {!isVip && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/vip')}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <Crown size={20} className="text-white" />
                {t('getVip') || 'Enable VIP Access'}
              </button>
              <p className="mt-2 text-sm text-gray-500 font-medium">VIP required for predictions</p>
            </div>
          )}

          {status === AppStatus.EXPIRED && isVip && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 border-2 border-red-600 px-4 py-1 rounded-full text-sm font-bold animate-bounce hidden md:block">
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

      {/* Decorations */}
      <div className="fixed bottom-4 left-4 hidden md:block opacity-20 transform rotate-12">
        <div className="w-20 h-20 bg-custom-pink border-[3px] border-black shadow-neubrutalist"></div>
      </div>
      <div className="fixed top-24 right-4 hidden md:block opacity-20 transform -rotate-6">
        <div className="w-16 h-16 rounded-full bg-custom-green border-[3px] border-black shadow-neubrutalist"></div>
      </div>

      <Notifications />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route path="/" element={<MainApp />} />
        <Route path="/profile" element={<ProfileWrapper />} />
        <Route path="/vip" element={<VIPWrapper />} />
        <Route path="/settings" element={<SettingsWrapper />} />
        <Route path="/about" element={<AboutWrapper />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="payments" element={<Payments />} />
            <Route path="vip" element={<VipManager />} />
            <Route path="logs" element={<Predictions />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Wrappers to handle internal navigation logic of existing components
const ProfileWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return <Login />;
  return <Profile onBack={() => navigate('/')} />;
};

const VIPWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return <Login />;
  return <VIP onBack={() => navigate('/')} />;
};

const SettingsWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return <Login />;
  return <Settings onBack={() => navigate('/')} />;
};

const AboutWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return <Login />;
  return <AboutUs onBack={() => navigate('/')} />;
};

export default App;