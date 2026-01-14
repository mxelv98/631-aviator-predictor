
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

const RIGHT_FEATURES = [
    { id: 1, icon: '🔥', text: 'توقعات مباشرة عالية الدقة' },
    { id: 2, icon: '🛡️', text: 'ضمان استرداد الأموال لمدة 7 أيام' },
    { id: 3, icon: '📈', text: 'تقارير سوق متعمقة أسبوعية' },
    { id: 4, icon: '✅', text: 'استراتيجيات تداول مخصصة' },
    { id: 5, icon: '🚀', text: 'دعم عملاء ذو أولوية قصوى' },
    { id: 6, icon: '🔔', text: 'تنبيهات فورية للتداولات' },
];

const LEFT_FEATURES = [
    { id: 7, icon: '⚡', text: 'تحليلات متقدمة في الوقت الفعلي' },
    { id: 8, icon: '🛡️', text: 'ضمان استرداد الأموال لمدة 7 أيام' },
    { id: 9, icon: '💎', text: 'الوصول إلى مجتمع VIP الحصري' },
    { id: 10, icon: '🎯', text: 'استراتيجيات تداول مخصصة' },
    { id: 11, icon: '🔒', text: 'حماية بيانات متقدمة' },
    { id: 12, icon: '📊', text: 'لوحة تحكم مخصصة للتحليلات' },
];

const PricingCard: React.FC = () => {
    const { t } = useLanguage();
    const playClick = useSound();
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubscribe = () => {
        playClick();
        window.open('https://nowpayments.io/payment/?iid=5898120827&source=button', '_blank');
    };

    return (
        <div className="w-full max-w-4xl bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-[1.01] mx-auto text-right" dir="rtl">
            {/* Header */}
            <div className="pt-10 pb-6 px-8 text-center">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2">
                    ابي VIP Access – 30 دقيقة توقعات حصرية
                </h1>
                <div className="text-6xl font-black text-gray-900 tracking-tighter">
                    66$
                </div>
            </div>

            {/* Separator with Badge */}
            <div className="relative flex items-center justify-center my-6 px-4">
                <div className="w-full h-[1px] bg-gray-100"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fbe5e9] text-gray-900 px-6 py-1.5 rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
                    Most Popular
                </div>
            </div>

            {/* Features Grid */}
            <div className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-4">
                        {RIGHT_FEATURES.map(feature => (
                            <div key={feature.id} className="flex items-center gap-3 text-[15px] text-gray-800 font-medium">
                                <span className="text-lg">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {LEFT_FEATURES.map(feature => (
                            <div key={feature.id} className="flex items-center gap-3 text-[15px] text-gray-800 font-medium">
                                <span className="text-lg">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Divider */}
            <div className="w-[90%] mx-auto h-[1px] bg-gray-100 mb-6"></div>

            {/* Action Footer */}
            <div className="px-8 pb-10 flex flex-col md:flex-row items-stretch gap-4">
                <div className="flex-1 flex flex-col">
                    <button
                        onClick={handleSubscribe}
                        className="w-full bg-black text-white text-xl font-bold py-4 rounded-xl hover:bg-gray-900 transition-all active:scale-95 shadow-lg mb-3"
                    >
                        اشترك الآن – 66$
                    </button>
                    <div className="flex flex-col items-center gap-1 text-[13px] text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                            <span>🔒</span>
                            <span>دفع آمن</span>
                        </div>
                        <span>الوصول محدود - ينتهي تلقائياً</span>
                    </div>
                </div>

                {/* Timer Widget */}
                <div className="bg-[#f2f3f5] rounded-2xl p-3 flex flex-col items-center justify-center min-w-[120px] border border-gray-100">
                    <span className="text-xs text-gray-400 font-bold mb-1">الوقت المتبقي</span>
                    <span className="text-3xl font-black text-gray-700 tracking-tight font-mono">
                        {formatTime(timeLeft)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
