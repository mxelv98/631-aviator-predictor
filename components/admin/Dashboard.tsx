import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import MetricsCard from './MetricsCard';
import ActivityTable from './ActivityTable';
import { MetricData, ActivityLog } from './types';
import { Users, Crown, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<MetricData[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Parallel fetching for performance
            const [usersRes, vipRes, paymentsRes] = await Promise.all([
                supabase.from('users').select('*', { count: 'exact', head: true }),
                supabase.from('vip_subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                supabase.from('payments').select('amount')
            ]);

            // Calculate total revenue
            const totalRevenue = paymentsRes.data?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0;

            const newMetrics: MetricData[] = [
                {
                    label: 'Total Users',
                    value: (usersRes.count || 0).toLocaleString(),
                    trend: 'All time',
                    trendDirection: 'up',
                    color: 'green',
                    icon: <Users className="w-6 h-6 text-green-500" />
                },
                {
                    label: 'Active VIPs',
                    value: (vipRes.count || 0).toLocaleString(),
                    trend: 'Currently active',
                    trendDirection: 'up',
                    color: 'green',
                    icon: <Crown className="w-6 h-6 text-green-500" />
                },
                {
                    label: 'Total Revenue',
                    value: `$${totalRevenue.toLocaleString()}`,
                    trend: 'All time',
                    trendDirection: 'up',
                    color: 'green',
                    icon: <DollarSign className="w-6 h-6 text-green-500" />
                },
            ];

            setMetrics(newMetrics);

            const { data: logs } = await supabase
                .from('admin_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (logs && logs.length > 0) {
                setActivities(logs.map(log => ({
                    id: log.id,
                    date: new Date(log.created_at).toLocaleString(),
                    user: log.admin_id,
                    action: log.action,
                    details: JSON.stringify(log.details),
                    status: 'Completed'
                })));
            } else {
                const { data: newUsers } = await supabase.from('users').select('*').order('created_at', { ascending: false }).limit(5);
                setActivities(newUsers?.map(u => ({
                    id: u.id,
                    date: new Date(u.created_at).toLocaleString(),
                    user: u.id.slice(0, 8),
                    action: 'New User Joined',
                    details: 'User registration',
                    status: 'Success'
                })) || []);
            }

        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
        setLoading(false);
    };

    return (
        <div className="p-10">
            <header className="mb-8 flex justify-between items-center sm:flex-row flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <Link
                    to="/admin/users"
                    className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-md flex items-center gap-2"
                >
                    <Users size={20} />
                    Manage Users & VIP
                </Link>
            </header>

            <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => <MetricsCard key={i} {...m} />)}
                </div>
            </section>

            <section className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading activity...</div>
                ) : (
                    <ActivityTable logs={activities} />
                )}
            </section>
        </div>
    );
};

export default Dashboard;
