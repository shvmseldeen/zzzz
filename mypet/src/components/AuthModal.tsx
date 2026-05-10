import { useState, useEffect } from 'react';
import { useApp } from '../lib/AppContext';

export default function AuthModal() {
  const { authModal, closeAuth, handleLogin, handleSignup } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(authModal.mode);

  useEffect(() => {
    if (authModal.open) setMode(authModal.mode);
  }, [authModal.open, authModal.mode]);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  if (!authModal.open) return null;

  const switchMode = (m: 'login' | 'signup') => setMode(m);

  const onLogin = () => {
    if (!loginEmail || !loginPassword) return;
    handleLogin(loginEmail, loginPassword);
  };

  const onSignup = () => {
    if (!signupName || !signupEmail || !signupPhone || !signupPassword) return;
    handleSignup(signupName, signupEmail, signupPhone, signupPassword);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-500 text-sm focus:outline-none focus:border-gold-400";
  const labelCls = "block text-xs font-semibold text-navy-500 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 z-[100] bg-navy-500/80 flex items-center justify-center p-4" onClick={closeAuth}>
      <div className="relative z-10 bg-ivory-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-navy-500 p-6 text-center relative">
          <button onClick={closeAuth} className="absolute top-4 right-4 text-ivory-100/60 hover:text-ivory-100 transition-colors">
            <i className="fas fa-times"></i>
          </button>
          <div className="w-14 h-14 rounded-2xl bg-gold-400 flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-paw text-ivory-100 text-2xl"></i>
          </div>
          <h2 className="text-xl font-bold text-ivory-100">
            {mode === 'login' ? 'Welcome Back' : 'Join PawLux'}
          </h2>
        </div>

        {mode === 'login' ? (
          <div className="p-6 space-y-4">
            <div><label className={labelCls}>Email Address</label><input type="email" className={inputCls} value={loginEmail} onChange={e => setLoginEmail(e.target.value)} /></div>
            <div><label className={labelCls}>Password</label><input type="password" className={inputCls} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && onLogin()} /></div>
            <button onClick={onLogin} className="w-full btn-gold py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:shadow-lg transition-all">Sign In</button>
            <p className="text-center text-sm text-navy-300">Don't have an account? <button onClick={() => switchMode('signup')} className="text-gold-400 font-semibold hover:text-gold-500">Sign Up</button></p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div><label className={labelCls}>Full Name</label><input type="text" className={inputCls} value={signupName} onChange={e => setSignupName(e.target.value)} /></div>
            <div><label className={labelCls}>Email</label><input type="email" className={inputCls} value={signupEmail} onChange={e => setSignupEmail(e.target.value)} /></div>
            <div><label className={labelCls}>Phone</label><input type="text" className={inputCls} value={signupPhone} onChange={e => setSignupPhone(e.target.value)} /></div>
            <div><label className={labelCls}>Password</label><input type="password" className={inputCls} value={signupPassword} onChange={e => setSignupPassword(e.target.value)} /></div>
            <button onClick={onSignup} className="w-full btn-gold py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:shadow-lg transition-all">Create Account</button>
            <p className="text-center text-sm text-navy-300">Already have an account? <button onClick={() => switchMode('login')} className="text-gold-400 font-semibold hover:text-gold-500">Sign In</button></p>
          </div>
        )}
      </div>
    </div>
  );
}
