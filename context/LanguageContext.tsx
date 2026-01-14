import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, languages } from '../lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic as per original HTML structure

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = languages.find(l => l.code === language)?.dir || 'ltr';
    }, [language]);

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const dir = languages.find(l => l.code === language)?.dir || 'ltr';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
};
