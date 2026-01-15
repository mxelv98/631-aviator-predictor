
import React from 'react';
import MetricsCard from './MetricsCard';
import ActivityTable from './ActivityTable';
import { MetricData, ActivityLog } from '../types';

const Dashboard: React.FC = () => {
  const metrics: MetricData[] = [
    {
      label: 'Total Users',
      value: '25,430',
      trend: '+12% this week',
      trendDirection: 'up',
      color: 'green',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    },
    {
      label: 'Total VIPs',
      value: '1,240',
      trend: '+5% this month',
      trendDirection: 'up',
      color: 'green',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    {
      label: 'Active VIPs',
      value: '890',
      trend: '+2% today',
      trendDirection: 'up',
      color: 'green',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" fillRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'Expired VIPs',
      value: '350',
      trend: '+8% this month',
      trendDirection: 'down',
      color: 'red',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fillRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'Total Payments',
      value: '$145,600',
      trend: '+15% this month',
      trendDirection: 'up',
      color: 'green',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.312-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.312.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" fillRule="evenodd" />
        </svg>
      )
    },
  ];

  const activities: ActivityLog[] = [
    { id: '1', date: '2024-05-25 10:30 AM', user: 'john.doe@example.com', action: 'User Created', details: 'New user registration', status: 'Success' },
    { id: '2', date: '2024-05-25 09:45 AM', user: 'sarah.admin', action: 'VIP Subscription Renewed', details: 'User ID 9021 subscription extended', status: 'Success' },
    { id: '3', date: '2024-05-24 04:15 PM', user: 'mike.smith', action: 'Payment Failed', details: 'Invoice #4562 decline', status: 'Failed' },
    { id: '4', date: '2024-05-24 02:00 PM', user: 'lisa.jones', action: 'User Permissions Updated', details: 'Role changed to Moderator', status: 'Success' },
    { id: '5', date: '2024-05-23 11:10 AM', user: 'david.lee', action: 'VIP Status Expired', details: 'User ID 5678 status update', status: 'Completed' },
  ];

  return (
    <div className="p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((m, i) => <MetricsCard key={i} {...m} />)}
        </div>
      </section>

      <section className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity (admin_logs)</h2>
        </div>
        <ActivityTable logs={activities} />
      </section>
    </div>
  );
};

export default Dashboard;
