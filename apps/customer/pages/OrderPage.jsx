import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { getOrder, listenToOrder } from '../../../shared/firebase/firestore';
import { formatCurrency } from '../../../shared/utils/currency';
import { LoadingSpinner } from '../../../shared/components';

const statusSteps = [
  { id: 'new', label: 'Order Received', labelAr: 'تم استلام الطلب', icon: '📋' },
  { id: 'preparing', label: 'Preparing', labelAr: 'قيد التحضير', icon: '👨‍🍳' },
  { id: 'ready', label: 'Ready', labelAr: 'جاهز', icon: '✅' },
  { id: 'completed', label: 'Completed', labelAr: 'مكتمل', icon: '🎉' },
];

// Demo order data
const demoOrder = {
  id: 'demo-order',
  status: 'preparing',
  tableNumber: '5',
  items: [
    { name: 'Mixed Grill Platter', nameAr: 'مشويات مشكلة', quantity: 1, price: 180 },
    { name: 'Hummus', nameAr: 'حمص', quantity: 2, price: 45 },
    { name: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', quantity: 2, price: 25 },
  ],
  subtotal: 295,
  tax: 41.3,
  tip: 30,
  total: 366.3,
  createdAt: new Date(),
};

export default function OrderPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use demo order for demo purposes
    if (orderId?.startsWith('demo')) {
      setTimeout(() => {
        setOrder({ ...demoOrder, id: orderId });
        setLoading(false);
      }, 500);
      return;
    }

    // Set up real-time listener for order
    const unsubscribe = listenToOrder(orderId, (orderData) => {
      setOrder(orderData);
      setLoading(false);
    });

    return () => unsubscribe?.();
  }, [orderId]);

  const currentStepIndex = statusSteps.findIndex(s => s.id === order?.status);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text={isRTL ? 'جاري التحميل...' : 'Loading order...'} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-xl text-gray-500">{isRTL ? 'الطلب غير موجود' : 'Order not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-[#2ecc71] font-semibold"
        >
          {isRTL ? 'العودة' : 'Go back'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <FiArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-bold">
                {isRTL ? 'تتبع الطلب' : 'Order Tracking'}
              </h1>
              <p className="text-white/60 text-sm">
                #{orderId?.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Status Progress */}
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="flex justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-white/20 rounded">
                <motion.div
                  className="h-full bg-[#2ecc71] rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-[#2ecc71] text-white' 
                          : 'bg-white/20 text-white/50'
                      } ${isCurrent ? 'ring-4 ring-[#2ecc71]/30' : ''}`}
                    >
                      {isCompleted ? (
                        <span className="text-xl">{step.icon}</span>
                      ) : (
                        <FiClock size={20} />
                      )}
                    </motion.div>
                    <p className={`text-xs mt-2 text-center ${isCompleted ? 'text-white' : 'text-white/50'}`}>
                      {language === 'ar' ? step.labelAr : step.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-white/60 text-sm">
                {isRTL ? 'الحالة الحالية' : 'Current Status'}
              </p>
              <p className="text-xl font-bold text-[#2ecc71] mt-1">
                {language === 'ar' 
                  ? statusSteps[currentStepIndex]?.labelAr 
                  : statusSteps[currentStepIndex]?.label}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className={`font-bold text-[#2c3e50] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'تفاصيل الطلب' : 'Order Details'}
          </h2>
          
          <div className="space-y-3">
            {order.items?.map((item, index) => {
              const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between py-2 border-b border-gray-100 last:border-0 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <span className="text-[#2c3e50]">{name}</span>
                  </div>
                  <span className="text-gray-500">
                    {formatCurrency(item.price * item.quantity, language === 'ar')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{formatCurrency(order.subtotal, language === 'ar')}</span>
            </div>
            <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'الضريبة' : 'Tax'}</span>
              <span>{formatCurrency(order.tax, language === 'ar')}</span>
            </div>
            {order.tip > 0 && (
              <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{isRTL ? 'الإكرامية' : 'Tip'}</span>
                <span>{formatCurrency(order.tip, language === 'ar')}</span>
              </div>
            )}
            <div className={`flex justify-between text-lg font-bold text-[#2c3e50] pt-2 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
              <span className="text-[#2ecc71]">{formatCurrency(order.total, language === 'ar')}</span>
            </div>
          </div>
        </div>

        {/* Reorder Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(-2)}
          className={`w-full mt-4 bg-gray-100 text-[#2c3e50] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <FiRefreshCw size={20} />
          {isRTL ? 'طلب مرة أخرى' : 'Order Again'}
        </motion.button>
      </div>
    </div>
  );
}

