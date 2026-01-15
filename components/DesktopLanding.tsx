import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, ArrowRight, Star, Shield, Zap } from 'lucide-react';

const DesktopLanding: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Navbar */}
            <nav className="w-full py-6 px-12 md:px-24 flex justify-between items-center border-b-2 border-black">
                <div className="text-4xl font-black tracking-tighter">1631</div>
                <div className="hidden md:flex gap-8 font-bold text-lg">
                    <a href="#features" className="hover:underline">Features</a>
                    <a href="#about" className="hover:underline">About</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="flex-1 flex flex-col md:flex-row items-center justify-center p-12 md:p-24 gap-16 bg-gray-50">
                <div className="flex-1 space-y-8 max-w-2xl">
                    <div className="inline-block px-4 py-2 bg-black text-white font-bold rounded-full text-sm uppercase tracking-wide">
                        Mobile Exclusive Experience
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-none text-black">
                        PREDICT. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">WIN.</span> <br />
                        EARN.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium">
                        The world's most advanced AI predictor is designed for your pocket.
                        Experience the power of 1631 on your mobile device.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-4 bg-white border-[3px] border-black p-4 rounded-xl shadow-neubrutalist transition-all hover:-translate-y-1">
                            <div className="bg-gray-100 p-3 rounded-lg border-2 border-black">
                                <Smartphone size={32} />
                            </div>
                            <div>
                                <div className="font-black uppercase text-sm text-gray-400">Available On</div>
                                <div className="font-bold text-xl">Mobile Web</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm font-bold text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        For the best experience, open this site on your phone.
                    </div>
                </div>

                {/* Simulated Mobile Mockup */}
                <div className="flex-1 relative">
                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500">
                        <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                            <div className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center p-6 text-center bg-gray-50">
                                <div className="font-black text-6xl mb-4">1631</div>
                                <div className="w-full bg-black text-white py-3 rounded-full font-bold mb-4 shadow-lg">Start Predicting</div>
                                <div className="text-gray-400 text-xs">AI Powered Analysis</div>
                            </div>
                        </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute top-10 -right-10 bg-white p-4 border-[3px] border-black rounded-xl shadow-neubrutalist rotate-12 animate-float">
                        <Zap size={24} className="text-yellow-500 fill-current" />
                    </div>
                    <div className="absolute bottom-20 -left-10 bg-white p-4 border-[3px] border-black rounded-xl shadow-neubrutalist -rotate-12 animate-float-delayed">
                        <Star size={24} className="text-purple-500 fill-current" />
                    </div>
                </div>
            </header>

            {/* Features Strip */}
            <section id="features" className="py-20 bg-black text-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Zap size={48} className="text-yellow-400" />
                        <h3 className="text-2xl font-bold">Fastest Predictions</h3>
                        <p className="text-gray-400">Our AI processes data in milliseconds to give you the winning edge.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Shield size={48} className="text-blue-400" />
                        <h3 className="text-2xl font-bold">Secure Intelligence</h3>
                        <p className="text-gray-400">Enterprise grade security for your data and prediction history.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Star size={48} className="text-purple-400" />
                        <h3 className="text-2xl font-bold">VIP Access</h3>
                        <p className="text-gray-400">Join the elite club of predictors with our exclusive VIP tiers.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DesktopLanding;
