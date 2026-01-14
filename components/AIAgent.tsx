import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

const AIAgent: React.FC = () => {
    const { t } = useLanguage();
    const playClick = useSound();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: 'model', text: t('aiWelcome') || 'Hello! I am your VIP assistant. How can I help you today?' }]);
        }
    }, [t]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            scrollRef.current.scrollLeft = 0; // Prevent horizontal scroll issues
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        playClick();

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        history.push({ role: 'user', parts: [{ text: userMsg }] });

        try {
            const response = await chatWithSupport(history);
            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleOpen = () => {
        playClick();
        setIsOpen(!isOpen);
    }

    return (
        <>
            <button
                onClick={toggleOpen}
                className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-neubrutalist active:shadow-none z-50 border-2 border-black"
            >
                <span className="text-2xl">🤖</span>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white border-[3px] border-black shadow-neubrutalist z-50 rounded-xl overflow-hidden flex flex-col max-h-[500px]">
                    <div className="bg-custom-green p-4 border-b-[3px] border-black flex justify-between items-center">
                        <span className="font-black text-lg">{t('aiAssistant')}</span>
                        <button onClick={toggleOpen} className="text-2xl font-black">×</button>
                    </div>

                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg border-2 border-black max-w-[85%] font-bold ${m.role === 'user'
                                    ? 'bg-blue-100 self-end border-blue-900'
                                    : 'bg-white self-start'
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-white p-3 rounded-lg border-2 border-black self-start animate-pulse">
                                ... {t('analyzing')}
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t-[3px] border-black bg-white flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('typeQuery')}
                            className="flex-1 p-2 border-2 border-black rounded font-bold outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-custom-green border-2 border-black p-2 rounded font-black active:shadow-none shadow-neubrutalist-sm active:translate-y-1"
                        >
                            {t('send')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAgent;
