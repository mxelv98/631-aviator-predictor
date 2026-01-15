import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

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
    const { t } = useLanguage();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    const numericId = user ? getNumericId(user.id) : '00000000';
    const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : t('unknownInitials');

    return (
        <div className="flex flex-col items-center justify-start pt-16 pb-12 px-4 md:px-6 w-full max-w-2xl mx-auto font-sans text-black">
            <div className="w-full border-[3px] border-black p-8 shadow-neubrutalist rounded-2xl bg-white relative">
                <div className="flex flex-col items-center mb-8 pb-8 border-b-2 border-black">
                    <div className="w-24 h-24 rounded-full border-[3px] border-black mb-4 overflow-hidden bg-gray-100 flex items-center justify-center shadow-neubrutalist-sm">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-black text-gray-400">{userInitials}</span>
                        )}
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-center">
                        {user?.user_metadata?.full_name || t('userProfile')}
                    </h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-1 text-gray-500">{t('email')}</label>
                        <div className="text-xl font-bold bg-gray-100 p-3 rounded-xl border-2 border-black">
                            {user?.email || t('noEmailProvided')}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-1 text-gray-500">{t('accountId')}</label>
                        <div className="text-xl font-mono font-bold bg-gray-100 p-3 rounded-xl border-2 border-black tracking-widest">
                            {numericId}
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col gap-4">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white font-bold py-3 border-2 border-black shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all rounded-xl hover:bg-red-600"
                        >
                            Log Out
                        </button>

                        <button
                            onClick={onBack}
                            className="w-full bg-white text-black font-bold py-3 border-2 border-black shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all rounded-xl hover:bg-gray-50"
                        >
                            Back to Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
