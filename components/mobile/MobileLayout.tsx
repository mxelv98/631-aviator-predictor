import React, { useState } from 'react';
import MobileLandingPage from './MobileLandingPage';
import MobileVipDashboard from './MobileVipDashboard';

enum MobileState {
    LANDING = 'LANDING',
    DASHBOARD = 'DASHBOARD'
}

const MobileLayout: React.FC = () => {
    const [view, setView] = useState<MobileState>(MobileState.LANDING);

    const handleUpgrade = () => {
        // In real app, check auth/payment
        setView(MobileState.DASHBOARD);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-[480px] bg-[#fdfbf7] min-h-screen shadow-xl relative">
                {view === MobileState.LANDING && (
                    <MobileLandingPage
                        onUpgrade={handleUpgrade}
                        onOpenChat={() => alert("Chat feature coming soon!")}
                    />
                )}
                {view === MobileState.DASHBOARD && (
                    <MobileVipDashboard
                        onBack={() => setView(MobileState.LANDING)}
                        onOpenChat={() => alert("Chat feature coming soon!")}
                    />
                )}
            </div>
        </div>
    );
};

export default MobileLayout;
