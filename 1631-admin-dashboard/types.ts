
// Added React import to resolve the 'Cannot find namespace React' error on line 7
import React from 'react';

export interface MetricData {
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: React.ReactNode;
  color: 'green' | 'red';
}

export interface ActivityLog {
  id: string;
  date: string;
  user: string;
  action: string;
  details: string;
  status: 'Success' | 'Failed' | 'Completed' | 'Pending';
}

export type View = 'dashboard' | 'users' | 'payments' | 'vips' | 'predictions' | 'settings';
