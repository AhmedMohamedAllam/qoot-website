import { motion } from 'framer-motion';
import { FiCamera, FiSmartphone } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function LandingPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1a252f] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 mx-auto mb-8 bg-[#2ecc71] rounded-3xl flex items-center justify-center shadow-lg shadow-[#2ecc71]/30"
        >
          <span className="text-white text-4xl font-black">Q</span>
        </motion.div>

        <h1 className="text-4xl font-black text-white mb-4">
          {isRTL ? 'مرحباً بك في قوت' : 'Welcome to Qoot'}
        </h1>
        
        <p className="text-white/60 text-lg mb-12">
          {isRTL 
            ? 'امسح رمز QR على طاولتك للوصول إلى القائمة الرقمية'
            : 'Scan the QR code on your table to access the digital menu'}
        </p>

        {/* Scan Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
            <FiCamera className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">
            {isRTL ? 'امسح رمز QR' : 'Scan QR Code'}
          </h2>
          
          <p className="text-white/60 text-sm mb-6">
            {isRTL 
              ? 'استخدم كاميرا هاتفك لمسح الرمز الموجود على طاولتك'
              : 'Use your phone camera to scan the code on your table'}
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 text-white/80 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FiSmartphone className="w-5 h-5" />
              <span>{isRTL ? 'لا حاجة لتطبيق' : 'No app needed'}</span>
            </div>
          </div>
        </motion.div>

        {/* Demo Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <a 
            href="/menu/demo-restaurant/1"
            className="text-[#2ecc71] font-semibold hover:underline"
          >
            {isRTL ? '← جرب القائمة التجريبية' : 'Try demo menu →'}
          </a>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-white/40 text-sm">
          Powered by <span className="text-[#2ecc71] font-bold">Qoot</span>
        </p>
      </motion.div>
    </div>
  );
}

