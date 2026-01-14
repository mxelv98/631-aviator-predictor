
import React, { useState } from 'react';
import { getMarketPrediction } from '../services/geminiService';
import { PredictionResult } from '../types';

const Dashboard: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    if (!symbol.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await getMarketPrediction(symbol);
      setPrediction(result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-3xl shadow-xl animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">لوحة تحكم VIP</h2>
          <p className="text-gray-500 font-medium">أهلاً بك في عالم التوقعات الحصرية</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          نشط الآن
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold mb-4">تحليل ذكي</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">أدخل اسم الأصل المالي (ذهب، نفط، بيتكوين، سهم آبل) للحصول على توقع مدعوم بالذكاء الاصطناعي.</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="مثال: Bitcoin"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري التحليل...
                  </>
                ) : 'تحليل السوق'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3 font-medium text-center">{error}</p>}
          </div>
        </div>

        {/* Prediction Display */}
        <div className="lg:col-span-2">
          {prediction ? (
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-50 shadow-sm animate-in slide-in-from-left duration-500">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-3xl font-black">{prediction.symbol}</h4>
                <div className={`px-6 py-2 rounded-full text-lg font-bold flex items-center gap-2 ${
                  prediction.trend === 'UP' ? 'bg-green-100 text-green-700' : 
                  prediction.trend === 'DOWN' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {prediction.trend === 'UP' ? '▲ صعود' : prediction.trend === 'DOWN' ? '▼ هبوط' : '● مستقر'}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-gray-400 font-bold text-sm uppercase mb-2 tracking-wider">الأسباب والتحليل</h5>
                  <p className="text-gray-700 leading-relaxed text-lg">{prediction.reasoning}</p>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-500">مستوى الثقة</span>
                    <span className="font-black text-gray-900 text-xl">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-black h-full transition-all duration-1000" 
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 p-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-bold text-lg">بانتظار تحليل الأصل المالي...</p>
              <p className="text-sm mt-2">سيظهر تقريرك الحصري هنا بعد الضغط على "تحليل السوق"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
