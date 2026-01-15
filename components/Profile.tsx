import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { languages } from '../lib/translations';
import { Crown, Moon, Bell, Globe, LogOut, ArrowLeft, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProfileProps {
    onBack: () => void;
}

const getNumericId = (uid: string): string => {
    let hash = 0;
    for (let i = 0; i < uid.length; i++) {
        hash = ((hash << 5) - hash) + uid.charCodeAt(i);
        hash |= 0; // Ensure 32-bit integer
    }
    return Math.abs(hash).toString().substring(0, 8);
};

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    // Settings State
    const [notifications, setNotifications] = useState(true);
    const [loadingSettings, setLoadingSettings] = useState(true);

    // VIP State
    const [vipExpiry, setVipExpiry] = useState<Date | null>(null);
    const [vipTimeRemaining, setVipTimeRemaining] = useState<number>(0);

    const handleLogout = async () => {
        try {
            await logout();
            onBack(); // Ensure simple navigation back after logout
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchSettings();
            fetchVipStatus();
        }
    }, [user]);

    // VIP Timer
    useEffect(() => {
        if (vipExpiry) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const end = vipExpiry.getTime();
                const diff = end - now;
                setVipTimeRemaining(diff);
                if (diff <= 0) setVipExpiry(null);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [vipExpiry]);

    const fetchSettings = async () => {
        if (!user) return;
        const { data } = await supabase.from('user_settings').select('notifications_enabled').eq('user_id', user.id).single();
        if (data) {
            setNotifications(data.notifications_enabled);
        }
        setLoadingSettings(false);
    };

    const fetchVipStatus = async () => {
        if (!user) return;
        const { data } = await supabase
            .from('vip_subscriptions')
            .select('end_time')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .gt('end_time', new Date().toISOString())
            .single();
        if (data) {
            setVipExpiry(new Date(data.end_time));
        }
    };

    // toggleDarkMode is replaced by toggleTheme from context

    const toggleNotifications = async () => {
        const newValue = !notifications;
        setNotifications(newValue);
        if (user) {
            await supabase.from('user_settings').upsert({
                user_id: user.id,
                notifications_enabled: newValue
            });
        }
    };

    const numericId = user ? getNumericId(user.id) : '00000000';
    const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : '?';

    const getVipColor = () => {
        const minutes = vipTimeRemaining / 60000;
        if (minutes > 10) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
        if (minutes > 2) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-pulse';
    };

    const formatTime = (ms: number) => {
        const totalSec = Math.floor(ms / 1000);
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col pt-4 pb-12 px-4 md:px-6 font-sans text-black dark:text-white transition-colors duration-300">
            {/* Nav */}
            <div className="w-full max-w-2xl mx-auto flex justify-between items-center mb-8">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold uppercase tracking-wider">{t('profileParameters') || 'Profile & Settings'}</h1>
                <div className="w-8"></div> {/* Spacer */}
            </div>

            <div className="w-full max-w-2xl mx-auto space-y-6">

                {/* Profile Card */}
                <div className="bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-zinc-700 p-8 shadow-neubrutalist dark:shadow-none rounded-2xl relative overflow-hidden">
                    <div className="flex flex-col items-center pb-6 border-b-2 border-dashed border-gray-200 dark:border-zinc-800">
                        <div className="w-24 h-24 rounded-full border-[3px] border-black dark:border-zinc-600 mb-4 overflow-hidden bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            {user?.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-black text-gray-400">{userInitials}</span>
                            )}
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-center dark:text-white">
                            {user?.user_metadata?.full_name || 'User'}
                        </h2>
                        <span className="font-mono text-gray-500 dark:text-gray-400 text-sm mt-1">ID: {numericId}</span>
                    </div>

                    {/* VIP Status */}
                    <div className="mt-6 text-center">
                        {vipExpiry ? (
                            <div className={`p-4 rounded-xl border-2 ${getVipColor()} flex flex-col items-center justify-center gap-2`}>
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Crown size={24} className="fill-current" />
                                    <span>VIP Active</span>
                                </div>
                                <div className="text-4xl font-black tracking-widest font-mono">
                                    {formatTime(vipTimeRemaining)}
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl border-2 border-transparent text-gray-500 dark:text-gray-400 flex flex-col items-center">
                                <span className="font-bold">Free Plan</span>
                                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">
                                    Upgrade to VIP
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings Section */}
                <div className="bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-zinc-700 p-6 shadow-neubrutalist dark:shadow-none rounded-2xl">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Moon size={20} />
                        Preferences
                    </h3>

                    <div className="space-y-4">
                        {/* Dark Mode */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                    <Moon size={20} />
                                </div>
                                <span className="font-bold">Dark Mode</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>

                        {/* Notifications */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <Bell size={20} />
                                </div>
                                <span className="font-bold">Notifications</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={toggleNotifications} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Language Section */}
                <div className="bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-zinc-700 p-6 shadow-neubrutalist dark:shadow-none rounded-2xl">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Globe size={20} />
                        {t('language') || 'Language'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className={`
                                    py-3 px-4 rounded-xl font-bold border-2 transition-all text-sm
                                    ${language === lang.code
                                        ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                                        : 'bg-white text-black border-gray-200 hover:border-black dark:bg-zinc-800 dark:text-gray-300 dark:border-zinc-700'}
                                `}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                    <LogOut size={20} />
                    {t('logout') || 'Log Out'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
