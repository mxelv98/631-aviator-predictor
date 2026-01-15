
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string, method: 'email' | 'google') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Initializing Secure Channel...",
    "Synchronizing Neural Keys...",
    "Verifying Operator Identity...",
    "Establishing Encrypted Tunnel...",
    "Access Granted."
  ];

  const simulateLogin = async (type: 'email' | 'google') => {
    setIsLoading(true);
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 450));
    }
    onLogin(type === 'google' ? 'operator_google@1631.ai' : email || 'operator@1631.ai', type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) simulateLogin('email');
  };

  return (
    <div className="flex flex-col h-full bg-brand-bg text-slate-200 p-10 justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="mb-16 text-center space-y-2">
          <h1 className="text-6xl font-black italic tracking-tighter text-white">
            1631 <span className="text-brand-primary">AI</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-slate-800"></div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Neural Terminal v4.2</p>
            <div className="h-[1px] w-8 bg-slate-800"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-10 py-10 animate-in fade-in duration-500">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-brand-primary/10 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-t-2 border-brand-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-ping"></div>
                </div>
              </div>
              <p className="mt-8 text-xs font-black text-brand-primary uppercase tracking-[0.3em]">{steps[step]}</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 font-mono text-[9px] text-slate-500 space-y-1 max-w-[280px] mx-auto">
              <div className="flex justify-between"><span>SECURE_ID:</span> <span>0x3F...A2</span></div>
              <div className="flex justify-between"><span>NODE_SYNC:</span> <span>STABLE</span></div>
              <div className="flex justify-between"><span>LATENCY:</span> <span>12ms</span></div>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-brand-primary transition-colors">Operator Credentials</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@1631.ai"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:border-brand-primary focus:ring-0 transition-all placeholder:text-slate-700"
                  required
                />
              </div>
              <div className="group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Access Key"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:border-brand-primary focus:ring-0 transition-all placeholder:text-slate-700"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-black font-black py-6 rounded-2xl text-xs uppercase tracking-[0.5em] hover:bg-brand-primary hover:text-white transition-all shadow-2xl active:scale-[0.98] mt-4"
              >
                Authenticate access
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">or bridge via</span>
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </div>

            <button 
              onClick={() => simulateLogin('google')}
              className="w-full bg-slate-950 border border-white/5 text-white font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-slate-900 transition-all group"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" className="group-hover:scale-110 transition-transform">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Cloud Handshake
            </button>
          </div>
        )}
      </div>

      <footer className="mt-20 text-center opacity-40">
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">Hardware Lock: {Math.random().toString(36).substr(2, 6).toUpperCase()}-NODE</p>
      </footer>
    </div>
  );
};

export default LoginPage;
