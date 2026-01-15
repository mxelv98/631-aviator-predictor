import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('light');
    const { user } = useAuth(); // AuthContext must be above ThemeProvider

    useEffect(() => {
        // Load from local storage first
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setThemeState(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
        }
    }, []);

    useEffect(() => {
        // If user logs in, fetch their preference
        const fetchUserTheme = async () => {
            if (!user) return;

            const { data } = await supabase
                .from('user_settings')
                .select('dark_mode')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setThemeState(data.dark_mode ? 'dark' : 'light');
            }
        };

        fetchUserTheme();
    }, [user]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // Save to Supabase if logged in
        if (user) {
            await supabase
                .from('user_settings')
                .upsert({
                    user_id: user.id,
                    dark_mode: newTheme === 'dark',
                    updated_at: new Date().toISOString()
                });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
