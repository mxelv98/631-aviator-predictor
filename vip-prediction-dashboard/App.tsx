
import React from 'react';
import VipCard from './components/VipCard';
import FeatureCard from './components/FeatureCard';
import AIAgent from './components/AIAgent';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-12 font-cairo">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-black">
          قسم الـ VIP والميزات
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <VipCard />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <FeatureCard 
            title="عداد وقت VIP"
            description="تتبع الوقت بدقة للفرص الحصرية."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2WK-YFhGGIpHRjNg__NxHCBPgI8HIM04Zmnnpnpf3tHUq4vuERwACrs5HlrHwBJNUVrLJ41R3ostabLEPDMVNpvMnpVCtgUD4W0RTLNw1GW0ZzXanz3rbH7MpcVImJbCmbHoKA7sTU_Egcuq8UOumio-r9foyeByu34P2-pDcaJIaRHNUxHZHbNYTnBCaBXdeSBmOP-JssuBb2jRgUn8Di9QJuRisN9o7N57l7aSbkqJqJk-3iF92D-ozOfasbmcbVNg3p2wZ-zr"
          />
          <FeatureCard 
            title="نسبة نجاح تقريبية"
            description="تقدير دقيق لفرص النجاح بناءً على البيانات."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCrZVAADI9iTc8ycGNGUlyw2zYiPmoCF3OJIkCNh8N53jdRNNqbAZqu7Zec9Y_j3VQAAjazxMFkQsNEF-CtUjZGFEY45k37yQ_5RdVTF2E0TAnsm8JhiG59TsfbwOsJvzn-Q1yi2lbMz--e35LYvuPJdpiLo9nOsJ1yi0lufl1Wbq5vGrvk_mx1slt4q_JzWRTaQ8soNXO1rtMB4xtV14WS0PgzROcNfRFy6-V0m3RF5Dzk6peGa1EhMtZ00FdCxzXcj6_r6Lozujr4"
          />
          <FeatureCard 
            title="تنبيهات"
            description="استلام إشعارات فورية بالتحديثات الهامة."
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ65S5-rbygKGiaAIKC1GgE3eElIVn6h9lmCCLaRuHWzwpNIJnX1g-wQFowXhUrAY5jCiMigOW_aWwWT9AJ-tNhfWWOFw_3EJ1jLb0inl6qeONVoX2zz9GbncmMWgUrsFrlwqSJWApP0ARsEicy7KGbhxLwXZg3HFR4FHXLTQOU1G4GNrYT4tAQ8NGbWXAE164Cufgj721nxtXEj6YcuROYvBMonppcthTg2EEfNB86OtwWnTHMyiGjaumiOWtEFK_FATGhR8cKu1W"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto pt-10 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="order-2 md:order-1 font-bold text-gray-800">
           © 1631 جميع الحقوق محفوظة.
        </div>
        <nav className="order-1 md:order-2 flex flex-wrap justify-center gap-8 font-black">
          <a href="#" className="hover:underline transition-all hover:translate-x-1">اتصل بنا</a>
          <a href="#" className="hover:underline transition-all hover:translate-x-1">سياسة الخصوصية</a>
          <a href="#" className="hover:underline transition-all hover:translate-x-1">الشروط والأحكام</a>
        </nav>
      </footer>

      {/* AI Assistant Floating UI */}
      <AIAgent />
    </div>
  );
};

export default App;
