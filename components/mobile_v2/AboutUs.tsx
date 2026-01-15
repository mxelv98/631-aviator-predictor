
import React from 'react';
import { User } from './types';

interface AboutUsProps {
    user: User;
    onBack: () => void;
}

const CONTENT = {
    English: {
        title: "About 1631 Systems",
        mission: "Our Mission",
        missionText: "To redefine volatility prediction through neural cluster analysis. 1631 Systems is at the forefront of high-frequency data modeling for the modern decentralized era.",
        core: "Core Technology",
        coreText: "Utilizing 6th-generation deep learning algorithms, our terminal synchronizes with live market nodes to map fractal sequences and identify probability peaks with sub-millisecond latency.",
        security: "Encryption & Trust",
        securityText: "Every operational handshake is secured via AES-256 military-grade encryption. Your terminal access is private, untraceable, and uniquely bound to your neural key.",
        contact: "Operational Support",
        contactText: "For kernel synchronization issues or license inquiries, bridge with our AI strategist via the neural support channel."
    },
    'العربية': {
        title: "عن أنظمة 1631",
        mission: "مهمتنا",
        missionText: "إعادة تعريف التنبؤ بالتقلبات من خلال تحليل التجمعات العصبية. أنظمة 1631 هي الرائدة في نمذجة البيانات عالية التردد للعصر الحديث.",
        core: "التكنولوجيا الأساسية",
        coreText: "باستخدام خوارزميات التعلم العميق من الجيل السادس، يتزامن نظامنا مع عقد السوق المباشرة لرسم التسلسلات وتحديد ذروات الاحتمالية بزمن وصول أقل من مللي ثانية.",
        security: "التشفير والثقة",
        securityText: "يتم تأمين كل عملية عبر تشفير AES-256 من الدرجة العسكرية. وصولك إلى النظام خاص، غير قابل للتتبع، ومرتبط بشكل فريد بمفتاحك العصبي.",
        contact: "الدعم التشغيلي",
        contactText: "لمشكلات مزامنة النواة أو استفسارات الترخيص، تواصل مع خبير الذكاء الاصطناعي عبر قناة الدعم العصبي."
    }
};

const AboutUs: React.FC<AboutUsProps> = ({ user, onBack }) => {
    const isArabic = user.language === 'العربية';
    const lang = isArabic ? CONTENT['العربية'] : CONTENT['English'];

    return (
        <div className="flex flex-col h-full bg-[#02050A] text-slate-200 overflow-y-auto hide-scrollbar">
            <header className="px-6 py-6 flex items-center gap-4 border-b border-white/5 sticky top-0 bg-[#02050A]/80 backdrop-blur-md z-10">
                <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-all active:scale-90">
                    <svg className={isArabic ? 'rotate-180' : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                </button>
                <span className="font-black text-sm uppercase tracking-[0.2em]">{lang.title}</span>
            </header>

            <div className="p-8 space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-brand-primary flex items-center justify-center font-black text-white text-4xl shadow-2xl shadow-brand-primary/20 italic mb-6">
                        1
                    </div>
                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.6em] text-center">Version 4.2 Stable Core</p>
                </div>

                <section className="space-y-3">
                    <h3 className="text-brand-primary font-black text-xs uppercase tracking-widest">{lang.mission}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{lang.missionText}</p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-brand-primary font-black text-xs uppercase tracking-widest">{lang.core}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{lang.coreText}</p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-brand-primary font-black text-xs uppercase tracking-widest">{lang.security}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{lang.securityText}</p>
                </section>

                <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-3">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest">{lang.contact}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-bold uppercase tracking-tight">{lang.contactText}</p>
                    <button className="w-full py-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary/20 transition-all">
                        {isArabic ? 'فتح قناة الدعم' : 'Open Support Channel'}
                    </button>
                </div>

                <footer className="pt-10 border-t border-white/5 text-center">
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">© 2025 1631 GLOBAL SYSTEMS CO.</p>
                </footer>
            </div>
        </div>
    );
};

export default AboutUs;
