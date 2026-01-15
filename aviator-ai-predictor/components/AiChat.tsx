
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { getAiAnalysis } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface AiChatProps {
  user: User;
  onBack: () => void;
}

const AiChat: React.FC<AiChatProps> = ({ user, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `HEY! I'm your AI strategist. Need a specific prediction or a game plan?`, sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputValue.toUpperCase(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    const aiResponseText = await getAiAnalysis(inputValue, user.isVip);
    setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: aiResponseText || 'SERVER ERROR.', sender: 'ai' }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gum-beige">
      <header className="p-4 bg-white border-b-[3px] border-black flex justify-between items-center sticky top-0 z-10 shadow-neo-sm">
        <button onClick={onBack} className="neo-button bg-gum-yellow border-[3px] border-black px-4 py-1 font-black text-xs uppercase shadow-neo">
          BACK
        </button>
        <div className="font-black uppercase tracking-tighter">AI STRATEGIST</div>
        <div className="w-8"></div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 border-[3px] border-black shadow-neo font-bold text-sm ${
              m.sender === 'user' ? 'bg-gum-blue text-white' : 'bg-white text-black'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gum-pink border-[3px] border-black shadow-neo px-4 py-2 font-black animate-pulse uppercase text-xs">
              AI IS THINKING...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t-[3px] border-black flex gap-3">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ASK ANYTHING..."
          className="flex-1 bg-white border-[3px] border-black shadow-neo-sm px-4 py-3 font-black text-sm uppercase placeholder:text-gray-400 focus:ring-0 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="neo-button bg-gum-green border-[3px] border-black shadow-neo p-3 disabled:opacity-50"
        >
          <svg fill="black" height="24" viewBox="0 0 24 24" width="24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AiChat;
