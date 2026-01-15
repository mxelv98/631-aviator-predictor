import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Crown } from 'lucide-react';
import Header from './components/Header';
import PredictorCard from './components/PredictorCard';
import { AppStatus } from './types';
import clsx from 'clsx';

import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import Profile from './components/Profile';
import VIP from './components/VIP';
import AboutUs from './components/AboutUs';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import useSound from './hooks/useSound';
import Notifications from './components/Notifications';
import VipAccessModal from './components/VipAccessModal';

// Admin Imports
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserList from './components/admin/UserList';
import Payments from './components/admin/Payments';
import VipManager from './components/admin/VipManager';
import Predictions from './components/admin/Predictions';

// Wrapper Components
// Actually user said "PC stays as is" -> meaning old dashboard.
// I will just use MainApp for PC.

// ...

const HomeWrapper = () => {
  const { user } = useAuth();
  if (!user) return <Login />;
  return <MainApp />;
};

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

const AboutWrapper = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return <Login />;
  return <AboutUs onBack={() => navigate('/')} />;
};

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
  const [showVipModal, setShowVipModal] = React.useState(false);
  const [vipTimeRemaining, setVipTimeRemaining] = React.useState<number>(0);

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

  // Countdown timer for prediction
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

  // Timer for VIP countdown & Dynamic Colors
  useEffect(() => {
    if (vipExpiry) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const end = vipExpiry.getTime();
        const diff = end - now;

        setVipTimeRemaining(diff);

        if (diff <= 0) {
          setIsVip(false);
          setVipExpiry(null);
          setStatus(AppStatus.IDLE);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [vipExpiry]);

  const getVipTimerColor = () => {
    const minutesLeft = vipTimeRemaining / 60000;
    if (minutesLeft > 10) return 'bg-green-100 text-green-700 border-green-200';
    if (minutesLeft > 2) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
  };

  const formatVipTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  const handlePredict = async () => {
    playClick();
    if (!isVip) {
      setShowVipModal(true);
      return;
    }

    setStatus(AppStatus.LOADING);
    setTimeout(() => {
      const randomMultiplier = (Math.random() * 10 + 1).toFixed(2);
      setMultiplier(parseFloat(randomMultiplier));
      setStatus(AppStatus.PREDICTED);
      setSeconds(60);
    }, 2000);
  };

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!user) return <Login />;

  return (
    <div className="flex-grow flex flex-col items-center justify-start pt-8 pb-12 px-4 md:px-6">
      <div className="w-full max-w-5xl mb-8">
        <Header
          onProfileClick={() => navigate('/profile')}
          onVipClick={() => navigate('/vip')}
          onSettingsClick={() => navigate('/settings')}
          onAboutClick={() => navigate('/about')}
        />
      </div>

      <section className="text-center space-y-2 mb-10" data-purpose="title-section">
        <h1 className="text-6xl font-black leading-none bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
          1631
        </h1>
        <h2 className="text-2xl font-black text-black tracking-tighter uppercase drop-shadow-sm">
          {t('appTitle') || 'Aviator Crash Predictor'}
        </h2>

        {isVip && vipExpiry && (
          <div className={`mt-4 px-6 py-2 rounded-full text-lg font-bold border inline-flex items-center gap-2 transition-colors duration-300 ${getVipTimerColor()}`}>
            <Crown size={20} className="mb-0.5" />
            VIP Active: {formatVipTime(vipTimeRemaining)}
          </div>
        )}
      </section>

      <div className="relative group" data-purpose="action-area">
        <button
          onClick={handlePredict}
          disabled={status === AppStatus.LOADING}
          className={`
                            text-3xl font-black py-4 px-20 rounded-full border-[3px] shadow-neubrutalist 
                            transition-all duration-150 ease-in-out
                            ${isVip
              ? 'bg-black text-white border-black hover:translate-y-1 hover:shadow-neubrutalist-sm active:translate-y-2 active:shadow-none'
              : 'bg-gray-100 text-gray-400 border-gray-300'}
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

      {/* Decorations */}
      {/* 
                // Removed Decoration divs that were hidden hidden md:block anyway.
                 */}

      <Notifications />
      <VipAccessModal isOpen={showVipModal} onClose={() => setShowVipModal(false)} />
    </div>
  );
};

// Internal component to handle Router context
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={clsx('min-h-screen bg-gray-50 flex flex-col font-sans transition-colors duration-200', theme === 'dark' ? 'dark bg-gray-900' : '')}>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl w-full relative z-10">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/vip" element={<VIPWrapper />} />
          <Route path="/profile" element={<ProfileWrapper />} />
          <Route path="/about" element={<AboutWrapper />} />
          <Route path="/settings" element={<Navigate to="/profile" replace />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="vip" element={<VipManager />} />
            <Route path="payments" element={<Payments />} />
            <Route path="predictions" element={<Predictions />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// ... imports

import MobileV2Layout from './components/mobile_v2/MobileV2Layout';

// ... existing code

const App: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <MobileV2Layout />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;