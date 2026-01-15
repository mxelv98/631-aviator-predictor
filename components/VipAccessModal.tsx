import React from 'react';
import { Crown, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VipAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VipAccessModal: React.FC<VipAccessModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-zinc-800">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Header Section with Gradient */}
                <div className="relative px-6 pt-12 pb-8 text-center bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10">
                    <div className="mx-auto flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/20 ring-4 ring-yellow-100 dark:ring-yellow-900/30">
                        <Crown size={40} className="text-white drop-shadow-md" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        VIP Access Required
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                        This feature is exclusive to our VIP members. Upgrade now to unlock real-time AI predictions.
                    </p>
                </div>

                {/* Features List */}
                <div className="px-8 pb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                            <Sparkles size={14} />
                        </div>
                        <span>98.7% Accurate Predictions</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                            <ArrowRight size={14} />
                        </div>
                        <span>Real-time Signal Updates</span>
                    </div>
                </div>

                {/* Action Area */}
                <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800">
                    <button
                        onClick={() => {
                            onClose();
                            navigate('/vip'); // Assuming logic to scroll to payment or go to VIP page
                            // Or window.location.href = '#vip-section' if on same page
                            // For now, let's assume we navigate to the payment section/page
                            const vipSection = document.getElementById('vip-section');
                            if (vipSection) {
                                vipSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span>Get VIP Access</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
                        Instant activation after payment
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VipAccessModal;
