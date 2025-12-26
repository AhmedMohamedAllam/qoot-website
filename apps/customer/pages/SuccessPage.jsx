import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function SuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();

  // Generate a simple order number from the ID
  const orderNumber = orderId?.slice(-6).toUpperCase() || 'DEMO01';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 mx-auto mb-6 bg-[#2ecc71] rounded-full flex items-center justify-center shadow-lg shadow-[#2ecc71]/30"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FiCheck size={48} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-black text-[#2c3e50] mb-2">
            {isRTL ? '🎉 تم إرسال طلبك!' : '🎉 Order Confirmed!'}
          </h1>
          <p className="text-gray-500 mb-6">
            {isRTL 
              ? 'سيتم إعداد طلبك قريباً'
              : 'Your order is being prepared'}
          </p>
        </motion.div>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-6 mb-6"
        >
          <p className="text-sm text-gray-500 mb-1">
            {isRTL ? 'رقم الطلب' : 'Order Number'}
          </p>
          <p className="text-3xl font-black text-[#2c3e50] tracking-wider">
            #{orderNumber}
          </p>
        </motion.div>

        {/* Estimated Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center justify-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <FiClock size={18} className="text-[#f39c12]" />
            <span>{isRTL ? '15-20 دقيقة' : '15-20 mins'}</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <FiMapPin size={18} className="text-[#3498db]" />
            <span>{isRTL ? 'طاولتك' : 'Your table'}</span>
          </div>
        </motion.div>

        {/* Track Order Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/order/${orderId}`)}
          className="w-full bg-[#2c3e50] text-white py-4 rounded-2xl font-bold mb-3"
        >
          {isRTL ? 'تتبع الطلب' : 'Track Order'}
        </motion.button>

        {/* Back to Menu */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate(-3)}
          className="text-[#2ecc71] font-semibold hover:underline"
        >
          {isRTL ? 'العودة للقائمة' : 'Back to Menu'}
        </motion.button>
      </motion.div>
    </div>
  );
}

