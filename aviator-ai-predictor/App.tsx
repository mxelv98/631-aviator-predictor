
import React, { useState } from 'react';
import { AppState, User } from './types';
import LandingPage from './components/LandingPage';
import VipDashboard from './components/VipDashboard';
import AiChat from './components/AiChat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<User>({
    id: '1631',
    username: 'User1631',
    isVip: false
  });

  const handleUpgrade = () => {
    setUser(prev => ({ ...prev, isVip: true }));
    setCurrentPage(AppState.VIP_DASHBOARD);
  };

  const renderPage = () => {
    switch (currentPage) {
      case AppState.LANDING:
        return (
          <LandingPage 
            user={user} 
            onUpgrade={handleUpgrade} 
            onOpenChat={() => setCurrentPage(AppState.AI_CHAT)}
          />
        );
      case AppState.VIP_DASHBOARD:
        return (
          <VipDashboard 
            user={user} 
            onBack={() => setCurrentPage(AppState.LANDING)}
            onOpenChat={() => setCurrentPage(AppState.AI_CHAT)}
          />
        );
      case AppState.AI_CHAT:
        return (
          <AiChat 
            user={user} 
            onBack={() => setCurrentPage(user.isVip ? AppState.VIP_DASHBOARD : AppState.LANDING)} 
          />
        );
      default:
        return <LandingPage user={user} onUpgrade={handleUpgrade} onOpenChat={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-[420px] bg-white min-h-[100dvh] shadow-neo-lg border-[3px] border-black relative overflow-hidden flex flex-col">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
