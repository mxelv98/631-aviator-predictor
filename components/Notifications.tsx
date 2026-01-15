import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Bell, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Notifications: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        // Fetch unread messages
        fetchMessages();

        // Subscribe to new messages
        const channel = supabase
            .channel('public:admin_messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'admin_messages',
                    filter: `receiver_id=eq.${user.id}`
                },
                (payload) => {
                    handleNewMessage(payload.new);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'admin_messages',
                    filter: 'receiver_id=is.null' // Broadcasts
                },
                (payload) => {
                    handleNewMessage(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('admin_messages')
            .select('*')
            .or(`receiver_id.eq.${user?.id},receiver_id.is.null`)
            .eq('is_read', false)
            .order('created_at', { ascending: false });

        if (data) setMessages(data);
    };

    const handleNewMessage = (msg: any) => {
        setMessages(prev => [msg, ...prev]);
        // Play notification sound if desired
    };

    const dismissMessage = async (id: string) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        // Mark as read in DB if purely direct message, 
        // but for broadcasts we might need a separate 'read_receipts' table.
        // For simplicity, we just remove from UI for now or assume strictly unique messages.
        // If receiver_id is set, update is_read.
        // If it's broadcast, we can't update the single row is_read without affecting others.
        // Simplified: Local dismiss.

        // Optional: Update if direct
        /* 
        await supabase
            .from('admin_messages')
            .update({ is_read: true })
            .eq('id', id)
            .eq('receiver_id', user?.id);
        */
    };

    if (messages.length === 0) return null;

    return (
        <div className="fixed top-24 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className="pointer-events-auto bg-white/90 backdrop-blur-md border px-4 py-3 rounded-xl shadow-neubrutalist animate-in slide-in-from-right duration-300 flex items-start gap-3"
                >
                    <div className="p-2 bg-black/5 rounded-full shrink-0 text-black">
                        <Bell size={16} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Admin Message</p>
                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{msg.message}</p>
                    </div>
                    <button
                        onClick={() => dismissMessage(msg.id)}
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
