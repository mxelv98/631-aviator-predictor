
import React, { useState } from 'react';
import { AppState, User } from './types';
import LandingPage from './components/LandingPage';
import VipDashboard from './components/VipDashboard';
import AiChat from './components/AiChat';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';
import AboutUs from './components/AboutUs';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.LOGIN);
  const [user, setUser] = useState<User | null>(null);

  const isRTL = user?.language === 'العربية';

  const handleLogin = (email: string, method: 'email' | 'google') => {
    const newUser: User = {
      id: `U-${Math.floor(Math.random() * 9000) + 1000}`,
      username: email.split('@')[0],
      email: email,
      isVip: false,
      isV3Paid: false,
      scansCount: 0,
      version: '1631 3v',
      language: 'English'
    };
    setUser(newUser);
    setCurrentPage(AppState.LANDING);
  };

  const handleUpgradeV3 = () => {
    if (user) {
      setUser({ ...user, isV3Paid: true });
    }
  };

  const handleUpgradeV6 = () => {
    if (user) {
      setUser({ 
        ...user, 
        isVip: true, 
        version: '1631 6v' 
      });
    }
  };

  const incrementScan = () => {
    if (user) {
      setUser({ ...user, scansCount: user.scansCount + 1 });
    }
  };

  const handleUpdateLanguage = (lang: string) => {
    if (user) {
      setUser({ ...user, language: lang });
    }
  };

  const renderPage = () => {
    if (!user && currentPage !== AppState.LOGIN) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case AppState.LOGIN:
        return <LoginPage onLogin={handleLogin} />;
      case AppState.LANDING:
        return user ? (
          <LandingPage 
            user={user} 
            onUpgradeV3={handleUpgradeV3}
            onUpgradeV6={handleUpgradeV6}
            onOpenChat={() => setCurrentPage(AppState.AI_CHAT)}
            onOpenAccount={() => setCurrentPage(AppState.ACCOUNT)}
            onOpenAbout={() => setCurrentPage(AppState.ABOUT)}
            onStart={() => setCurrentPage(AppState.VIP_DASHBOARD)}
          />
        ) : null;
      case AppState.VIP_DASHBOARD:
        return user ? (
          <VipDashboard 
            user={user} 
            onScanPerformed={incrementScan}
            onUpgradeV3={handleUpgradeV3}
            onUpgradeV6={handleUpgradeV6}
            onBack={() => setCurrentPage(AppState.LANDING)}
            onOpenChat={() => setCurrentPage(AppState.AI_CHAT)}
            onOpenAccount={() => setCurrentPage(AppState.ACCOUNT)}
          />
        ) : null;
      case AppState.AI_CHAT:
        return user ? (
          <AiChat 
            user={user} 
            onBack={() => setCurrentPage(AppState.VIP_DASHBOARD)} 
          />
        ) : null;
      case AppState.ACCOUNT:
        return user ? (
          <AccountPage 
            user={user} 
            onBack={() => setCurrentPage(AppState.LANDING)}
            onUpgradeV3={handleUpgradeV3}
            onUpgradeV6={handleUpgradeV6}
            onOpenAbout={() => setCurrentPage(AppState.ABOUT)}
            onLogout={() => {
              setUser(null);
              setCurrentPage(AppState.LOGIN);
            }}
            onLanguageChange={handleUpdateLanguage}
          />
        ) : null;
      case AppState.ABOUT:
        return user ? (
          <AboutUs 
            user={user}
            onBack={() => setCurrentPage(AppState.ACCOUNT)}
          />
        ) : null;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#000000] sm:p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-[480px] bg-brand-bg min-h-[100dvh] sm:min-h-0 sm:h-[840px] relative overflow-hidden flex flex-col sm:rounded-[40px] sm:shadow-2xl sm:border border-brand-border">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
