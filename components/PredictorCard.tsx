
import React from 'react';

interface PredictorCardProps {
  multiplier: number | null;
  seconds: number;
  isLoading: boolean;
}

const PredictorCard: React.FC<PredictorCardProps> = ({ multiplier, seconds, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-md bg-gray-100 border-black p-10 shadow-neubrutalist flex flex-col items-center mt-12 border-[3px] rounded-[15px] animate-pulse">
        <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (multiplier === null) return null;

  return (
    <div className="w-full max-w-md bg-custom-pink border-black p-8 shadow-neubrutalist flex flex-col items-center mt-12 border-[3px] rounded-[15px] transition-all duration-300 transform scale-100">
      <div className="text-4xl md:text-5xl font-black text-black text-center mb-4" dir="rtl">
        التوقع القادم: <span className="text-black">{multiplier.toFixed(2)}x</span>
      </div>
      
      <div className="bg-custom-green border border-black/20 px-6 py-2 rounded-lg flex items-center justify-center gap-2" data-purpose="timer-badge">
        <span className="text-black font-black text-base" dir="rtl">
          وقت الإغلاق: {seconds} ثواني
        </span>
      </div>
    </div>
  );
};

export default PredictorCard;
