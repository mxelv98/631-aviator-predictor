
import React from 'react';
import { MetricData } from '../types';

const MetricsCard: React.FC<MetricData> = ({ label, value, trend, trendDirection, icon, color }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${color === 'green' ? 'bg-green-50' : 'bg-red-50'}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-3">{value}</div>
      <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        trendDirection === 'up' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-50 text-red-600'
      }`}>
        <svg 
          className={`w-3 h-3 mr-1 transform ${trendDirection === 'down' ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
        {trend}
      </div>
    </div>
  );
};

export default MetricsCard;
