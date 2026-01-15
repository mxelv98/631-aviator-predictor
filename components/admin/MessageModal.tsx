import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Send, Users } from 'lucide-react';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientId?: string | null; // null = broadcast
    recipientName?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, recipientId, recipientName }) => {
    const [message, setMessage] = useState('');
    const [sendViaEmail, setSendViaEmail] = useState(false);
    const [sending, setSending] = useState(false);

    if (!isOpen) return null;

    const handleSend = async () => {
        if (!message.trim()) return;
        setSending(true);

        try {
            // 1. Send In-App Message (Always)
            const { error: dbError } = await supabase
                .from('admin_messages')
                .insert({
                    sender_id: (await supabase.auth.getUser()).data.user?.id,
                    receiver_id: recipientId || null, // null for broadcast
                    message: message.trim(),
                    is_read: false
                });

            if (dbError) throw dbError;

            // 2. Send Email (Optional)
            if (sendViaEmail) {
                const { error: funcError } = await supabase.functions.invoke('send-broadcast', {
                    body: {
                        subject: "Important Message from 1631 Admin",
                        message: message.trim(),
                        recipient_ids: recipientId ? recipientId : 'all'
                    }
                });
                if (funcError) console.error("Edge Function Error:", funcError);
            }

            // Log action
            await supabase.from('admin_logs').insert({
                admin_id: (await supabase.auth.getUser()).data.user?.id,
                action: sendViaEmail ? 'SEND_MESSAGE_EMAIL' : 'SEND_MESSAGE',
                details: { recipient: recipientId || 'broadcast', message_preview: message.slice(0, 20) }
            });

            alert('Message sent successfully!');
            setMessage('');
            setSendViaEmail(false);
            onClose();

        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {recipientId ? (
                            <>Send to <span className="text-blue-600">{recipientName || 'User'}</span></>
                        ) : (
                            <>
                                <Users size={18} className="text-purple-600" />
                                Broadcast to All Users
                            </>
                        )}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <textarea
                        className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black/20 outline-none resize-none text-gray-700 bg-gray-50/50"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <div className="mt-4 flex items-center">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 select-none">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/20"
                                checked={sendViaEmail}
                                onChange={(e) => setSendViaEmail(e.target.checked)}
                            />
                            Send copy via Email (Resend)
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={sending || !message.trim()}
                            className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-black/20"
                        >
                            <Send size={16} />
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
