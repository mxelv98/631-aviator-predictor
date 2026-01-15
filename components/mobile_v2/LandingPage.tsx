
import React from 'react';
import { User } from './types';

interface LandingPageProps {
    user: User;
    onUpgradeV3: () => void;
    onUpgradeV6: () => void;
    onOpenChat: () => void;
    onOpenAccount: () => void;
    onOpenAbout: () => void;
    onStart: () => void;
}

const TRANSLATIONS = {
    English: {
        hero: "Precision Control.",
        sub: "Harnessing 6th-gen deep cluster neural analysis for real-time market prediction.",
        v3: "Standard Terminal",
        v3Details: "$56.00 • 72-Hour Operational License",
        v6: "Neural Elite",
        v6Details: "Deep Cluster Mapping • $66 / 30m Access",
        activate: "Activate Elite Access",
        init: "Initialize Terminal",
        kernel: "Kernel",
        support: "Neural_Support",
        about: "About Us",
        free: "2 Free Credits"
    },
    'العربية': {
        hero: "تحكم دقيق.",
        sub: "تسخير تحليل التجمعات العصبية العميقة من الجيل السادس للتنبؤ بالسوق في الوقت الفعلي.",
        v3: "المحطة القياسية",
        v3Details: "56.00 دولار • ترخيص تشغيل لمدة 72 ساعة",
        v6: "النخبة العصبية",
        v6Details: "رسم خرائط التجمعات العميقة • 66 دولار / 30 دقيقة",
        activate: "تفعيل وصول النخبة",
        init: "بدء تشغيل المحطة",
        kernel: "النواة",
        support: "الدعم_العصبي",
        about: "من نحن",
        free: "2 رصيد مجاني"
    }
};

const LandingPage: React.FC<LandingPageProps> = ({ user, onUpgradeV3, onUpgradeV6, onOpenChat, onOpenAccount, onOpenAbout, onStart }) => {
    const isArabic = user.language === 'العربية';
    const t = isArabic ? TRANSLATIONS['العربية'] : TRANSLATIONS['English'];

    return (
        <div className="flex flex-col h-full bg-brand-bg text-slate-200">
            <main className="flex-1 px-8 py-16 flex flex-col justify-center relative overflow-y-auto">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

                {/* Logo Section */}
                <div className="mb-14 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center font-black text-white text-xl shadow-lg shadow-brand-primary/20 italic">
                        1
                    </div>
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white leading-none">1631 AI</h2>
                        <p className="text-[7px] font-black text-brand-primary uppercase tracking-[0.5em] mt-1">Authorized Node</p>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="mb-14 space-y-4 animate-in fade-in duration-1000 delay-100">
                    <h1 className="text-6xl font-black tracking-tighter text-white leading-[0.85] uppercase italic">
                        {t.hero.split(' ')[0]} <br /><span className="text-brand-primary">{t.hero.split(' ')[1]}</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[280px]">
                        {t.sub}
                    </p>
                </div>

                {/* Tier Cards */}
                <div className="space-y-4 mb-14">
                    {/* 3v Card */}
                    <div className={`group p-6 rounded-[32px] border transition-all duration-500 ${!user.isVip ? 'border-brand-primary/30 bg-brand-primary/5 pro-shadow' : 'border-white/5 opacity-40 grayscale'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest italic">Core v3.2</span>
                            {!user.isV3Paid && !user.isVip && (
                                <div className="bg-brand-primary text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.free}</div>
                            )}
                        </div>
                        <h3 className="text-xl font-black text-white italic mb-1 uppercase">{t.v3}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{t.v3Details}</p>
                    </div>

                    {/* 6v Elite Card */}
                    <div
                        className={`group p-8 rounded-[36px] border transition-all duration-700 relative overflow-hidden ${user.isVip ? 'border-brand-elite bg-brand-elite/10 elite-glow' : 'border-white/10 bg-white/[0.02] hover:border-brand-elite/30'}`}
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className={`w-3 h-3 rounded-full ${user.isVip ? 'bg-brand-elite animate-ping' : 'bg-slate-800'}`}></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black text-brand-elite uppercase tracking-[0.3em] italic">Elite v6.8</span>
                                <span className="px-2 py-0.5 bg-brand-elite/10 text-brand-elite text-[7px] font-black rounded uppercase border border-brand-elite/20">Hyper-Sync</span>
                            </div>
                            <h3 className="text-2xl font-black text-white italic mb-2 uppercase">{t.v6}</h3>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter leading-none mb-6">
                                {t.v6Details}
                            </p>

                            {!user.isVip && (
                                <button
                                    onClick={onUpgradeV6}
                                    className="w-full py-4 bg-brand-elite text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-elite/20 transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {t.activate}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Start Action */}
                <button
                    onClick={onStart}
                    className={`w-full py-7 rounded-[40px] font-black text-sm uppercase tracking-[0.5em] transition-all relative overflow-hidden flex items-center justify-center gap-4 group shadow-2xl active:scale-[0.98]
            ${user.isVip ? 'bg-brand-elite text-black' : 'bg-white text-black hover:bg-brand-primary hover:text-white'}
          `}
                >
                    {t.init}
                    <svg className={`group-hover:translate-x-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </main>

            <footer className="p-8 flex justify-between items-center border-t border-white/5 bg-black/40 backdrop-blur-md">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{isArabic ? 'النظام يعمل' : 'Terminal Operational'}</p>
                <div className="flex gap-6">
                    <button onClick={onOpenAccount} className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">{t.kernel}</button>
                    <button onClick={onOpenChat} className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">{t.support}</button>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
