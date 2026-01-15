import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Shield, User, Crown, MessageSquare, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import MessageModal from './MessageModal';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ id: string, name?: string } | null>(null);

    // Live Timer State
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select(`
                *,
                vip_subscriptions (
                    status,
                    end_time
                )
            `)
            .order('created_at', { ascending: false }); // Show newest first

        if (error) {
            console.error('Error fetching users:', error);
        } else {
            setUsers(data || []);
        }
        setLoading(false);
    };

    const handleRoleUpdate = async (userId: string, newRole: string) => {
        if (!confirm(`Are you sure you want to make this user a ${newRole}?`)) return;

        const { error } = await supabase
            .from('users')
            .update({ role: newRole })
            .eq('id', userId);

        if (error) alert('Failed to update role');
        else fetchUsers();
    };

    const handleGiveVip = async (userId: string) => {
        const confirmVip = confirm("Give this user 30 minutes of VIP access?");
        if (!confirmVip) return;

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 minutes

        const { error } = await supabase
            .from('vip_subscriptions')
            .upsert({
                user_id: userId,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
                status: 'active',
                activated_by_admin: true
            });

        if (error) {
            console.error(error);
            alert('Failed to active VIP');
        } else {
            // Log action
            await supabase.from('admin_logs').insert({
                admin_id: (await supabase.auth.getUser()).data.user?.id,
                action: 'GIVE_VIP',
                details: { user_id: userId, duration: '30m' }
            });
            alert('VIP Activated for 30 Minutes!');
            fetchUsers();
        }
    };

    const openMessageModal = (user: any) => {
        setSelectedUser({ id: user.id, name: user.email || user.id.slice(0, 8) });
        setIsMessageModalOpen(true);
    };

    const openBroadcastModal = () => {
        setSelectedUser(null);
        setIsMessageModalOpen(true);
    };

    const filteredUsers = users.filter(u =>
        u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <MessageModal
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                recipientId={selectedUser?.id}
                recipientName={selectedUser?.name}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Users</h2>
                    <p className="text-gray-500 mt-1">Manage user access and roles.</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={openBroadcastModal}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm text-sm font-medium"
                    >
                        <MessageSquare size={16} />
                        Broadcast
                    </button>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID or Email..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">VIP Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading users...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const activeVip = user.vip_subscriptions?.find((v: any) => v.status === 'active' && new Date(v.end_time) > now);

                                let timerDisplay = null;
                                let timerColor = "bg-gray-50 text-gray-500 border-gray-100";

                                if (activeVip) {
                                    const end = new Date(activeVip.end_time);
                                    const diff = end.getTime() - now.getTime();
                                    const minutes = Math.floor(diff / 60000);
                                    const seconds = Math.floor((diff % 60000) / 1000);

                                    timerDisplay = `${minutes}m ${seconds}s`; // Format: 5m 30s

                                    if (minutes > 10) timerColor = "bg-green-50 text-green-700 border-green-200";
                                    else if (minutes > 2) timerColor = "bg-yellow-50 text-yellow-700 border-yellow-200";
                                    else timerColor = "bg-red-50 text-red-700 border-red-200 animate-pulse";
                                }

                                return (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">
                                                        {user.email || user.id.slice(0, 8) + '...'}
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono">
                                                        {user.id.slice(0, 8)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`
                                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                                ${user.role === 'admin'
                                                    ? 'bg-purple-50 text-purple-700 border-purple-100'
                                                    : 'bg-gray-50 text-gray-600 border-gray-100'}
                                            `}>
                                                {user.role === 'admin' && <Shield size={12} />}
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {activeVip ? (
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${timerColor}`}>
                                                    <Crown size={12} className="mb-0.5" />
                                                    {timerDisplay}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">Inactive</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <button
                                                    onClick={() => openMessageModal(user)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                                                    title="Send Message"
                                                >
                                                    <MessageSquare size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleGiveVip(user.id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md transition-all font-bold text-xs border border-amber-200"
                                                    title="Give 30m VIP"
                                                >
                                                    <Sparkles size={14} />
                                                    <span>Give VIP 30m</span>
                                                </button>
                                                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                                                <button
                                                    onClick={() => handleRoleUpdate(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                                    className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
                                                >
                                                    {user.role === 'admin' ? 'Demote' : 'Promote'}
                                                </button>
                                            </div>
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

export default UserList;
