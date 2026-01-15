import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Crown, Clock, AlertTriangle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const VipManager: React.FC = () => {
    const [subs, setSubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('vip_subscriptions')
            .select('*')
            .order('end_time', { ascending: false });

        if (error) console.error('Error fetching subs:', error);
        else setSubs(data || []);
        setLoading(false);
    };

    const handleExtend = async (id: string, currentEndTime: string) => {
        // Add 30 minutes
        const newEnd = new Date(new Date(currentEndTime).getTime() + 30 * 60000).toISOString();
        const { error } = await supabase
            .from('vip_subscriptions')
            .update({ end_time: newEnd, status: 'active' })
            .eq('id', id);

        if (error) alert('Failed to extend');
        else fetchSubs();
    };

    const handleCancel = async (id: string) => {
        if (!confirm('Are you sure you want to cancel this subscription?')) return;
        const { error } = await supabase
            .from('vip_subscriptions')
            .update({ status: 'expired', end_time: new Date().toISOString() })
            .eq('id', id);

        if (error) alert('Failed to cancel');
        else fetchSubs();
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">VIP Subscriptions</h2>
                <p className="text-gray-500 mt-1">Monitor and manage active VIP sessions.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">End Time / Remaining</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading subscriptions...</td></tr>
                        ) : subs.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No subscriptions found.</td></tr>
                        ) : (
                            subs.map((sub) => {
                                const isActive = sub.status === 'active' && new Date(sub.end_time) > new Date();
                                return (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{sub.user_id?.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {format(new Date(sub.start_time), 'MMM d, HH:mm')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {format(new Date(sub.end_time), 'HH:mm')}
                                            </div>
                                            {isActive && (
                                                <div className="text-xs text-green-600 font-medium">
                                                    {formatDistanceToNow(new Date(sub.end_time))} left
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isActive ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    <Crown size={12} /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                                    Expired
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleExtend(sub.id, sub.end_time)}
                                                className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded"
                                            >
                                                +30m
                                            </button>
                                            {isActive && (
                                                <button
                                                    onClick={() => handleCancel(sub.id)}
                                                    className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors bg-red-50 px-2 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VipManager;
