
import React from 'react';
import { ActivityLog } from '../types';

interface ActivityTableProps {
  logs: ActivityLog[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ logs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-white font-semibold border-b border-gray-200 text-gray-500">
          <tr>
            <th className="px-6 py-3 w-48" scope="col">Date</th>
            <th className="px-6 py-3 w-48" scope="col">User</th>
            <th className="px-6 py-3 w-56" scope="col">Action</th>
            <th className="px-6 py-3" scope="col">Details</th>
            <th className="px-6 py-3 w-32" scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-gray-900">{log.date}</td>
              <td className="px-6 py-4 text-gray-900">{log.user}</td>
              <td className="px-6 py-4 text-gray-900">{log.action}</td>
              <td className="px-6 py-4 text-gray-500">{log.details}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    log.status === 'Success' || log.status === 'Completed' ? 'bg-green-500' : 
                    log.status === 'Failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-gray-900 font-medium">{log.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
