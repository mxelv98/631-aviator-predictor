import React, { useState, useEffect } from 'react';
import { AppState, User } from './types';
import LandingPage from './LandingPage';
import VipDashboard from './VipDashboard';
import AiChat from './AiChat';
import AccountPage from './AccountPage';
import LoginPage from './LoginPage';
import AboutUs from './AboutUs';
import SubscriptionPage from './SubscriptionPage';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const MobileV2Layout: React.FC = () => {
    const { user: authUser, loginWithEmail, loginWithGoogle, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState<AppState>(AppState.LOGIN);
    const [user, setUser] = useState<User | null>(null);

    const isRTL = user?.language === 'العربية';

    // Sync remote auth state to local User state
    const syncUserData = async () => {
        if (!authUser) {
            setUser(null);
            if (currentPage !== AppState.LOGIN) {
                setCurrentPage(AppState.LOGIN);
            }
            return;
        }

        // Check VIP status
        const { data: vipData } = await supabase
            .from('vip_subscriptions')
            .select('*')
            .eq('user_id', authUser.id)
            .eq('status', 'active')
            .gt('end_time', new Date().toISOString())
            .maybeSingle();

        const isVip = !!vipData;

        // Access plan_type safely
        const planType = (vipData as any)?.plan_type || 'core_v3';
        const isElite = isVip && planType === 'elite_v6';

        const scansCount = parseInt(localStorage.getItem('aviator_scans_count') || '0', 10);
        const language = localStorage.getItem('aviator_language') || 'English';

        const newUser: User = {
            id: authUser.id,
            username: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email,
            isVip: isVip,
            isV3Paid: isVip,
            scansCount: scansCount,
            version: isElite ? '1631 6v' : '1631 3v',
            language: language,
            vipExpiry: vipData?.end_time,
            planType: planType
        };

        setUser(newUser);

        // If we're on Login page but have a user, go to Landing
        if (currentPage === AppState.LOGIN) {
            setCurrentPage(AppState.LANDING);
        }
    };

    useEffect(() => {
        if (!authUser) return;

        syncUserData();

        // Subscribe to Realtime Updates for VIP status
        const channel = supabase
            .channel('vip_updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'vip_subscriptions',
                    filter: `user_id=eq.${authUser.id}`,
                },
                () => {
                    syncUserData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [authUser]);

    const handleLogin = async (email: string, password: string) => {
        await loginWithEmail(email, password);
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setCurrentPage(AppState.LOGIN);
    };

    const handleUpgradeV3 = () => {
        setCurrentPage(AppState.SUBSCRIPTION);
    };

    const handleUpgradeV6 = () => {
        setCurrentPage(AppState.SUBSCRIPTION);
    };

    const handleSelectPlan = (plan: 'core_v3' | 'elite_v6') => {
        // Redirect to Pay Page as requested
        // For now, redirect to /vip which is the payment flow container
        // If we had separate links, we'd use them.
        window.location.href = '/vip';
    };

    const incrementScan = () => {
        if (user) {
            const newCount = user.scansCount + 1;
            const updatedUser = { ...user, scansCount: newCount };
            setUser(updatedUser);
            localStorage.setItem('aviator_scans_count', newCount.toString());
        }
    };

    const handleUpdateLanguage = (lang: string) => {
        if (user) {
            const updatedUser = { ...user, language: lang };
            setUser(updatedUser);
            localStorage.setItem('aviator_language', lang);
        }
    };

    const renderPage = () => {
        if (!user && currentPage !== AppState.LOGIN) {
            return <LoginPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
        }

        switch (currentPage) {
            case AppState.LOGIN:
                return <LoginPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
            case AppState.SUBSCRIPTION:
                return user ? (
                    <SubscriptionPage
                        user={user}
                        onSelectPlan={handleSelectPlan}
                        onBack={() => setCurrentPage(AppState.LANDING)}
                    />
                ) : null;
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
                        onLogout={handleLogout}
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
                return <LoginPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
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

export default MobileV2Layout;
