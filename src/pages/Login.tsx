import { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait a bit for App.tsx onAuthStateChanged to pick up the role
      setTimeout(() => navigate('/admin'), 500);
    } catch (err: any) {
      console.error('Email Login Error:', err);
      setLoading(false);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. If you are a team member, please use Google Sign-In.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      if (!auth.app.options.apiKey) {
        throw new Error('Firebase configuration missing. Please check your setup.');
      }
      await signInWithPopup(auth, googleProvider);
      setTimeout(() => navigate('/admin'), 500);
    } catch (err: any) {
      console.error('Google Login Error:', err);
      setLoading(false);
      setError(`Google Sign-In failed: ${err.message}. Please ensure you are using your @unifiedplatforms.com account and that this domain is authorized in Firebase Console.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-white bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-brand-white p-10 rounded-[32px] border border-brand-dark/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-primary"></div>
        
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mx-auto mb-6">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="text-3xl font-bold text-brand-dark tracking-tight uppercase">Unified Platforms Portal</h2>
          <p className="text-brand-gray mt-2 font-medium">Secure Administrative Access</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2 ml-1">Internal Identity</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@unifiedplatforms.com"
              className="w-full px-5 py-4 border border-brand-dark/10 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all bg-brand-white text-brand-dark font-medium placeholder:text-brand-gray/40"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2 ml-1">Access Token</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 border border-brand-dark/10 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all bg-brand-white text-brand-dark font-medium placeholder:text-brand-gray/40"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-brand-dark text-brand-white font-bold rounded-2xl hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/10 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating Session...' : 'Authenticate Session'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-brand-dark/5"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-brand-white px-2 text-brand-gray/40">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full px-6 py-4 bg-white border border-brand-dark/10 text-brand-dark font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Team SSO
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-brand-dark/5 text-center">
          <p className="text-[10px] text-brand-gray/50 uppercase tracking-widest font-bold">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
