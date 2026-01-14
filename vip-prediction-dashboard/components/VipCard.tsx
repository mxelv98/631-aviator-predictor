
import React from 'react';

const VipCard: React.FC = () => {
  const features = [
    { icon: '⚡', label: 'توقعات سريعة وحصرية' },
    { icon: '🔄', label: 'تحديث مباشر كل جولة' },
    { icon: '💎', label: 'دعم أولوية على مدار الساعة' },
    { icon: '📈', label: 'تحليل بيانات متقدم' },
    { icon: '🔒', label: 'الوصول إلى محتوى حصري' },
  ];

  return (
    <section className="mb-12">
      <div className="bg-mint-green border-[3px] border-black rounded-xl shadow-hard w-full max-w-4xl mx-auto p-8 sm:p-12 text-center transition-transform hover:-translate-y-1">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black">
          30 دقيقة توقعات حصرية – VIP Access VIP
        </h2>
        
        <div className="text-[4rem] sm:text-[5rem] font-black mb-10 text-black leading-none">
          66$
        </div>

        <ul className="text-lg sm:text-xl font-bold inline-block text-right mx-auto space-y-5">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-4 justify-start">
              <span className="text-2xl">{f.icon}</span>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <button className="bg-black text-white text-xl font-bold py-4 px-12 rounded-lg shadow-hard-sm active-shadow border-2 border-black">
            اشترك الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default VipCard;
