import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

interface HeaderProps {
  onProfileClick: () => void;
  onVipClick: () => void;
  onSettingsClick: () => void;
  onAboutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, onVipClick, onSettingsClick, onAboutClick }) => {
  const { t } = useLanguage();
  const playClick = useSound();

  const handleNav = (action: () => void) => {
    playClick();
    action();
  };

  return (
    <header className="w-full border-b-[3px] border-black bg-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <div className="font-black tracking-tight text-4xl md:text-6xl select-none" data-purpose="logo">
        1631
      </div>

      <nav className="flex items-center text-lg md:text-xl font-bold gap-4 md:gap-6" data-purpose="navigation">
        <button
          onClick={() => handleNav(onAboutClick)}
          className="hover:underline decoration-2 underline-offset-4 cursor-pointer"
        >
          {t('aboutUs')}
        </button>
        <span className="opacity-30 mx-1 md:mx-2 select-none">|</span>
        <button
          onClick={() => handleNav(onVipClick)}
          className="hover:underline decoration-2 underline-offset-4 cursor-pointer"
        >
          VIP
        </button>
        <span className="opacity-30 mx-1 md:mx-2 select-none">|</span>
        <button
          onClick={() => handleNav(onProfileClick)}
          className="hover:underline decoration-2 underline-offset-4 cursor-pointer"
        >
          {t('profile')}
        </button>
        <span className="opacity-30 mx-1 md:mx-2 select-none">|</span>
        <button
          onClick={() => handleNav(onSettingsClick)}
          className="hover:underline decoration-2 underline-offset-4 cursor-pointer text-2xl"
          title={t('settings')}
        >
          ⚙️
        </button>
      </nav>
    </header>
  );
};

export default Header;
