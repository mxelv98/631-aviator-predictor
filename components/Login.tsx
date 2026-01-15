import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

const Login: React.FC = () => {
    const { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
    const { t } = useLanguage();
    const playClick = useSound();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        setError('');
        setSuccessMsg('');
        try {
            if (isLogin) {
                await loginWithEmail(email, password);
            } else {
                await signupWithEmail(email, password);
                setSuccessMsg(t('checkEmail') || 'We sent you an email. Please check your inbox to verify your account.');
            }
        } catch (err: any) {
            console.error('Email auth error:', err);
            // Handle common Supabase errors
            if (err.message.includes('already registered')) {
                setError(t('emailInUse') || 'This email is already registered. Please login.');
            } else {
                setError(err.message || 'Operation failed. Please check your credentials.');
            }
        }
    };

    const handleSwitch = () => {
        playClick();
        setIsLogin(!isLogin);
        setError('');
        setSuccessMsg('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans text-center">
            {/* 1631 Logo */}
            <h1 className="text-6xl font-black mb-8 tracking-tighter text-black">1631</h1>

            <div className="bg-white p-8 rounded-2xl shadow-neubrutalist border-[3px] border-black w-full max-w-md">
                <h2 className="text-3xl font-black mb-6 text-black">
                    {isLogin ? t('login') : t('signUp')}
                </h2>

                {successMsg && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded" role="alert">
                        <p className="font-bold">{t('success') || 'Success!'}</p>
                        <p>{successMsg}</p>
                    </div>
                )}

                {error && <p className="text-red-600 bg-red-100 p-2 rounded mb-4 font-bold border-2 border-red-200">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder={t('email')}
                        className="p-4 border-[3px] border-black rounded-lg font-bold text-lg outline-none focus:translate-x-1 transition-transform placeholder-gray-500 bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder={t('password')}
                        className="p-4 border-[3px] border-black rounded-lg font-bold text-lg outline-none focus:translate-x-1 transition-transform placeholder-gray-500 bg-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-end -mt-3"> {/* Added -mt-3 to reduce gap */}
                        <Link to="/forgot-password" className="text-sm font-semibold text-gray-500 hover:text-black">
                            {t('forgotPassword') || 'Forgot Password?'}
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white p-4 rounded-lg font-black text-xl shadow-neubrutalist hover:-translate-y-1 active:shadow-none active:translate-y-0 transition-all border-[3px] border-black"
                    >
                        {isLogin ? t('login') : t('signUp')}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-2 opacity-50 font-bold">
                    <div className="h-[2px] bg-black flex-1"></div>
                    <span>{t('or')}</span>
                    <div className="h-[2px] bg-black flex-1"></div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={async () => {
                            playClick();
                            setError('');
                            try {
                                await loginWithGoogle();
                            } catch (err: any) {
                                console.error('Google login error:', err);
                                setError('Google Sign-In failed: ' + (err.message || 'Unknown error'));
                                alert('Google Sign-In failed: ' + (err.message || 'Unknown error. Check console.'));
                            }
                        }}
                        className="bg-white text-black p-4 rounded-lg font-black text-lg border-[3px] border-black relative shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all flex items-center justify-center"
                    >
                        <span className="absolute left-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.55 0 2.95.53 4.05 1.58l3.03-3.03C17.45 2.07 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                        </span>
                        {t('google')}
                    </button>
                    <button
                        onClick={async () => {
                            playClick();
                            setError('');
                            try {
                                await loginWithFacebook();
                            } catch (err: any) {
                                console.error('Facebook login error:', err);
                                setError('Facebook Sign-In failed: ' + (err.message || 'Unknown error'));
                            }
                        }}
                        className="bg-[#1877F2] text-white p-4 rounded-lg font-black text-lg border-[3px] border-black relative shadow-neubrutalist-sm active:translate-y-1 active:shadow-none transition-all flex items-center justify-center"
                    >
                        <span className="absolute left-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white" /></svg>
                        </span>
                        {t('facebook')}
                    </button>
                </div>

                <p className="mt-8 font-bold text-gray-500 cursor-pointer hover:text-black hover:underline transition-all">
                    <span onClick={handleSwitch}>
                        {isLogin ? t('dontHaveAccount') || "Don't have an account? Sign Up" : t('alreadyHaveAccount') || "Already have an account? Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
