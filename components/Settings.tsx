import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages, Language } from '../lib/translations';

interface SettingsProps {
    onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
    const { language, setLanguage, t, dir } = useLanguage();

    return (
        <div className="min-h-screen bg-white flex flex-col p-4 sm:p-12 font-sans overflow-y-auto" dir={dir}>
            <button
                onClick={onBack}
                className="self-start mb-8 bg-white text-black font-bold py-2 px-6 border-2 border-black shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all rounded-xl hover:bg-gray-50"
            >
                ← {t('backToGame')}
            </button>

            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black text-black">
                    {t('settings')}
                </h1>
            </header>

            <main className="flex-grow w-full max-w-2xl mx-auto">
                <div className="bg-white border-[3px] border-black rounded-xl shadow-neubrutalist p-8">
                    <h2 className="text-2xl font-black mb-6 border-b-2 border-black pb-2">{t('language')}</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className={`
                            py-3 px-4 rounded-xl font-bold border-2 border-black transition-all
                            ${language === lang.code
                                        ? 'bg-black text-white shadow-neubrutalist-sm'
                                        : 'bg-white text-black hover:bg-gray-100'}
                        `}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
