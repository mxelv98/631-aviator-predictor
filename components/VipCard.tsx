import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

const VipCard: React.FC = () => {
    const { t } = useLanguage();
    const playClick = useSound();
    const [showModal, setShowModal] = useState(false);
    const [xbetId, setXbetId] = useState('');

    const features = [
        { icon: '⚡', label: t('vipFeature1') || 'Fast & Exclusive Predictions' },
        { icon: '🔄', label: t('vipFeature2') || 'Live Updates Every Round' },
        { icon: '💎', label: t('vipFeature3') || 'Priority Support 24/7' },
        { icon: '📈', label: t('vipFeature4') || 'Advanced Data Analysis' },
        { icon: '🔒', label: t('vipFeature5') || 'Access to Exclusive Content' },
    ];

    const handleSubscribeClick = () => {
        playClick();
        setShowModal(true);
    };

    const handleConfirm = () => {
        playClick();
        if (!xbetId.trim()) return;
        // Here we could log the ID to a server/database
        console.log('User 1xbet ID:', xbetId);

        // Redirect to payment
        window.open('https://nowpayments.io/payment/?iid=5898120827&source=button', '_blank');
        setShowModal(false);
    };

    const handleCancel = () => {
        playClick();
        setShowModal(false);
    }

    return (
        <section className="mb-12">
            <div className="bg-green-300 border-[3px] border-black rounded-xl shadow-neubrutalist w-full max-w-4xl mx-auto p-8 sm:p-12 text-center transition-transform hover:-translate-y-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black">
                    {t('vipSubscriptionTitle') || '30 Minutes Exclusive Predictions – VIP Access'}
                </h2>

                <div className="text-[4rem] sm:text-[5rem] font-black mb-10 text-black leading-none">
                    66$
                </div>

                <ul className="text-lg sm:text-xl font-bold inline-block text-right mx-auto space-y-5">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-center gap-4 justify-start">
                            <span className="text-2xl">{f.icon}</span>
                            <span>{f.label}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-10">
                    <button
                        onClick={handleSubscribeClick}
                        className="bg-black text-white text-xl font-bold py-4 px-12 rounded-lg shadow-neubrutalist-sm active:translate-y-1 active:shadow-none border-2 border-black transition-all"
                    >
                        {t('subscribeNow')}
                    </button>
                </div>
            </div>

            {/* 1xbet ID Data Collection Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-gumroad-white p-8 rounded-xl border-2 border-black shadow-gumroad w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <h3 className="text-2xl font-black mb-4">{t('enter1xbetId')}</h3>
                        <p className="mb-4 text-gray-600 font-bold">Please enter your 1xbet ID to link your subscription.</p>

                        <input
                            type="text"
                            value={xbetId}
                            onChange={(e) => setXbetId(e.target.value)}
                            placeholder="12345678"
                            className="w-full p-4 border-2 border-black rounded-lg font-bold text-lg mb-6 outline-none focus:shadow-gumroad-sm transition-all bg-gumroad-bg"
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-white text-black py-3 rounded-lg font-bold border-2 border-black hover:bg-gray-100 transition-colors"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 bg-black text-white py-3 rounded-lg font-bold border-2 border-black shadow-gumroad-sm active:translate-y-1 active:shadow-none transition-all"
                            >
                                {t('confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VipCard;
