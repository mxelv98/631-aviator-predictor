import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

interface AboutUsProps {
    onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
    const { t, dir } = useLanguage();
    const playClick = useSound();

    const handleBack = () => {
        playClick();
        onBack();
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col p-4 sm:p-12 font-sans overflow-y-auto" dir={dir}>
            <button
                onClick={handleBack}
                className="self-start mb-8 bg-white text-black font-bold py-2 px-6 border-[3px] border-black shadow-neubrutalist-sm hover:translate-y-0.5 hover:shadow-none active:translate-y-1 transition-all rounded-xl"
            >
                ← {t('backToGame')}
            </button>

            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter">
                    {t('aboutUs')}
                </h1>
            </header>

            <main className="flex-grow w-full max-w-4xl mx-auto space-y-8">
                <section className="bg-white border-[3px] border-black rounded-xl shadow-neubrutalist p-8 hover:shadow-neubrutalist-sm transition-all duration-300">
                    <h2 className="text-2xl font-black mb-4">{t('missionTitle') || 'Our Mission'}</h2>
                    <p className="text-lg font-medium text-gray-700 leading-relaxed">
                        {t('missionText')}
                    </p>
                </section>

                <section className="bg-custom-pink border-[3px] border-black rounded-xl shadow-neubrutalist p-8 hover:shadow-neubrutalist-sm transition-all duration-300">
                    <h2 className="text-2xl font-black mb-4">{t('disclaimerTitle') || 'Disclaimer'}</h2>
                    <p className="text-lg font-medium text-black leading-relaxed">
                        {t('disclaimerText')}
                    </p>
                </section>

                <section className="bg-custom-yellow border-[3px] border-black rounded-xl shadow-neubrutalist p-8 hover:shadow-neubrutalist-sm transition-all duration-300">
                    <h2 className="text-2xl font-black mb-4">{t('contactUs')}</h2>
                    <p className="text-lg font-medium text-black leading-relaxed mb-6">
                        {t('contactText')}
                    </p>
                    <a
                        href="https://t.me/maysttrobet"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="inline-block bg-[#229ED9] text-white font-black py-4 px-10 rounded-xl border-[3px] border-black shadow-neubrutalist-sm hover:translate-y-0.5 hover:shadow-none active:translate-y-1 transition-all"
                    >
                        {t('joinTelegram') || 'Join Telegram Channel'}
                    </a>
                </section>
            </main>

            <footer className="mt-20 text-center font-bold text-gray-400">
                {t('copyright') || '© 2024 1631 Aviator Predictor.'}
            </footer>
        </div>
    );
};

export default AboutUs;
