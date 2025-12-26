import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { loginWithEmail } from '../../../shared/firebase/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isRTL, toggleLanguage } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginWithEmail(email, password);
      
      if (result.success) {
        toast.success(isRTL ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
        navigate('/orders');
      } else {
        // For demo, allow any login
        toast.success(isRTL ? 'مرحباً بك (وضع تجريبي)' : 'Welcome! (Demo Mode)');
        navigate('/orders');
      }
    } catch (error) {
      // For demo, proceed anyway
      toast.success(isRTL ? 'مرحباً بك (وضع تجريبي)' : 'Welcome! (Demo Mode)');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1a252f] flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#2ecc71]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-4 bg-[#2ecc71] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2ecc71]/30"
          >
            <span className="text-white text-3xl font-black">Q</span>
          </motion.div>
          <h1 className="text-3xl font-black text-white">Qoot Dashboard</h1>
          <p className="text-white/60 mt-2">
            {isRTL ? 'سجل دخولك للوصول إلى لوحة التحكم' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Email Field */}
          <div className="mb-4">
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <div className="relative">
              <FiMail className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isRTL ? 'admin@qoot.app' : 'admin@qoot.app'}
                className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-4 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none transition-colors`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <FiLock className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-4 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none transition-colors`}
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#2ecc71] focus:ring-[#2ecc71]"
              />
              <span className="text-sm text-gray-600">
                {isRTL ? 'تذكرني' : 'Remember me'}
              </span>
            </label>
            <button type="button" className="text-sm text-[#2ecc71] hover:underline">
              {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-[#2ecc71] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#2ecc71]/30 flex items-center justify-center gap-2 disabled:opacity-50 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{isRTL ? 'جاري تسجيل الدخول...' : 'Signing in...'}</span>
              </>
            ) : (
              <>
                <span>{isRTL ? 'تسجيل الدخول' : 'Sign In'}</span>
                <FiArrowRight className={isRTL ? 'rotate-180' : ''} />
              </>
            )}
          </motion.button>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className={`text-sm text-blue-600 ${isRTL ? 'text-right' : ''}`}>
              <strong>🎯 {isRTL ? 'وضع تجريبي:' : 'Demo Mode:'}</strong>{' '}
              {isRTL 
                ? 'أدخل أي بريد وكلمة مرور للدخول'
                : 'Enter any email and password to login'}
            </p>
          </div>
        </motion.form>

        {/* Language Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleLanguage}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            {isRTL ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Powered by <span className="text-[#2ecc71] font-bold">Qoot</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

