
import React, { useState, useRef, useEffect } from 'react';
import { chatWithSupport } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'مرحباً! أنا مساعد VIP الذكي. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMsg }] });

    const response = await chatWithSupport(history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-hard active-shadow z-50 border-2 border-black"
      >
        <span className="text-2xl">🤖</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white border-[3px] border-black shadow-hard z-50 rounded-xl overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-mint-green p-4 border-b-[3px] border-black flex justify-between items-center">
            <span className="font-black text-lg">المساعد الذكي</span>
            <button onClick={() => setIsOpen(false)} className="text-2xl font-black">×</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border-2 border-black max-w-[85%] font-bold ${
                  m.role === 'user' 
                    ? 'bg-blue-100 self-end border-blue-900' 
                    : 'bg-white self-start'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white p-3 rounded-lg border-2 border-black self-start animate-pulse">
                ... جاري التحليل
              </div>
            )}
          </div>

          <div className="p-3 border-t-[3px] border-black bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب استفسارك..."
              className="flex-1 p-2 border-2 border-black rounded font-bold outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-mint-green border-2 border-black p-2 rounded font-black active-shadow"
            >
              إرسال
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgent;
