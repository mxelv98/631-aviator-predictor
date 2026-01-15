import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Determine if email confirmation is required based on session
                if (!data.session) {
                    alert("Registration successful! Please check your email to confirm your account.");
                    navigate('/login');
                } else {
                    // Auto-login if confirmation not required
                    navigate('/');
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border-[3px] border-black shadow-neubrutalist transform transition-all hover:-translate-y-1 hover:shadow-neubrutalist-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-black tracking-tighter uppercase mb-2">
                        {/* {t('joinUs') || 'Join 1631'} */}
                        JOIN 1631
                    </h1>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">
                        Create your account today
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border-[3px] border-black text-black p-3 mb-6 font-bold rounded-lg text-sm flex items-center shadow-neubrutalist-sm">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-black text-black uppercase ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110" size={20} strokeWidth={2.5} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-[3px] border-black rounded-xl focus:outline-none focus:bg-white focus:shadow-neubrutalist-sm transition-all font-bold placeholder-gray-400"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-black text-black uppercase ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110" size={20} strokeWidth={2.5} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-[3px] border-black rounded-xl focus:outline-none focus:bg-white focus:shadow-neubrutalist-sm transition-all font-bold placeholder-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-black text-black uppercase ml-1">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110" size={20} strokeWidth={2.5} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-[3px] border-black rounded-xl focus:outline-none focus:bg-white focus:shadow-neubrutalist-sm transition-all font-bold placeholder-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-xl font-black text-xl hover:bg-gray-900 border-[3px] border-black shadow-neubrutalist hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : (
                            <>
                                Sign Up <ArrowRight size={24} strokeWidth={3} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 font-bold">
                        Already have an account?{' '}
                        <Link to="/login" className="text-black underline decoration-2 hover:bg-yellow-200 transition-colors px-1 -mx-1 rounded">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
