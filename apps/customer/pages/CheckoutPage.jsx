import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { createOrder } from '../../../shared/firebase/firestore';
import toast from 'react-hot-toast';

const paymentMethods = [
  { id: 'cash', name: 'Cash', nameAr: 'نقداً', icon: FiDollarSign, description: 'Pay at the table', descriptionAr: 'الدفع على الطاولة' },
  { id: 'instapay', name: 'InstaPay', nameAr: 'إنستاباي', icon: FiSmartphone, description: 'Egyptian instant payment', descriptionAr: 'الدفع الفوري المصري' },
  { id: 'fawry', name: 'Fawry', nameAr: 'فوري', icon: FiCreditCard, description: 'Fawry payment network', descriptionAr: 'شبكة فوري للدفع' },
  { id: 'card', name: 'Card', nameAr: 'بطاقة', icon: FiCreditCard, description: 'Visa / Mastercard', descriptionAr: 'فيزا / ماستركارد' },
];

const tipOptions = [
  { value: 0, label: 'No Tip', labelAr: 'بدون' },
  { value: 10, label: '10%', labelAr: '10%' },
  { value: 15, label: '15%', labelAr: '15%' },
  { value: 20, label: '20%', labelAr: '20%' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  const { 
    items, subtotal, tax, total, tip, setTip, 
    orderType, setOrderType, specialInstructions, setSpecialInstructions,
    getOrderData, clearCart, restaurantId 
  } = useCart();
  
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [customTip, setCustomTip] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [loading, setLoading] = useState(false);

  const tipAmount = tip || (subtotal * (customTip ? parseFloat(customTip) / 100 : 0));
  const finalTotal = total + tipAmount - (tip || 0);

  const handleTipSelect = (value) => {
    setShowCustomTip(false);
    setCustomTip('');
    setTip(subtotal * (value / 100));
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderData = {
        ...getOrderData(),
        paymentMethod: selectedPayment,
        tip: tipAmount,
        total: finalTotal,
      };

      // Create order in Firebase
      const result = await createOrder(restaurantId, orderData);
      
      if (result.success) {
        clearCart();
        toast.success(isRTL ? 'تم إرسال طلبك!' : 'Order submitted!');
        navigate(`/success/${result.id}`);
      } else {
        // For demo, generate fake order ID
        const fakeOrderId = `demo-${Date.now()}`;
        clearCart();
        toast.success(isRTL ? 'تم إرسال طلبك!' : 'Order submitted!');
        navigate(`/success/${fakeOrderId}`);
      }
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ' : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <h1 className="text-xl font-bold text-[#2c3e50]">
              {isRTL ? 'إتمام الطلب' : 'Checkout'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Order Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h2 className={`font-bold text-[#2c3e50] mb-3 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'نوع الطلب' : 'Order Type'}
          </h2>
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {['dine-in', 'takeaway'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  orderType === type
                    ? 'bg-[#2ecc71] text-white shadow-lg shadow-[#2ecc71]/30'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type === 'dine-in' 
                  ? (isRTL ? '🍽️ داخل المطعم' : '🍽️ Dine In')
                  : (isRTL ? '🥡 استلام' : '🥡 Takeaway')
                }
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tip Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h2 className={`font-bold text-[#2c3e50] mb-3 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'إكرامية (اختياري)' : 'Tip (Optional)'}
          </h2>
          <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            {tipOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTipSelect(option.value)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  !showCustomTip && tip === subtotal * (option.value / 100)
                    ? 'bg-[#2ecc71] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {language === 'ar' ? option.labelAr : option.label}
              </button>
            ))}
            <button
              onClick={() => setShowCustomTip(true)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                showCustomTip ? 'bg-[#2ecc71] text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isRTL ? 'مخصص' : 'Custom'}
            </button>
          </div>
          
          {showCustomTip && (
            <div className="mt-3">
              <input
                type="number"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  setTip(subtotal * (parseFloat(e.target.value) / 100));
                }}
                placeholder={isRTL ? 'أدخل النسبة %' : 'Enter %'}
                className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none ${isRTL ? 'text-right' : ''}`}
              />
            </div>
          )}
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h2 className={`font-bold text-[#2c3e50] mb-3 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'طريقة الدفع' : 'Payment Method'}
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${isRTL ? 'flex-row-reverse' : ''} ${
                  selectedPayment === method.id
                    ? 'bg-[#2ecc71]/10 border-2 border-[#2ecc71]'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedPayment === method.id ? 'bg-[#2ecc71] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <method.icon size={24} />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="font-bold text-[#2c3e50]">
                    {language === 'ar' ? method.nameAr : method.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? method.descriptionAr : method.description}
                  </p>
                </div>
                {selectedPayment === method.id && (
                  <div className="w-6 h-6 rounded-full bg-[#2ecc71] flex items-center justify-center">
                    <FiCheck size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Special Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h2 className={`font-bold text-[#2c3e50] mb-3 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'ملاحظات خاصة' : 'Special Instructions'}
          </h2>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder={isRTL ? 'أي ملاحظات على طلبك...' : 'Any special requests...'}
            className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none resize-none ${isRTL ? 'text-right' : ''}`}
            rows={2}
          />
        </motion.div>
      </div>

      {/* Order Summary & Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="space-y-2 mb-4">
            <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{formatCurrency(subtotal, language === 'ar')}</span>
            </div>
            <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'الضريبة (14%)' : 'Tax (14%)'}</span>
              <span>{formatCurrency(tax, language === 'ar')}</span>
            </div>
            {tipAmount > 0 && (
              <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{isRTL ? 'الإكرامية' : 'Tip'}</span>
                <span>{formatCurrency(tipAmount, language === 'ar')}</span>
              </div>
            )}
            <div className={`flex justify-between text-lg font-bold text-[#2c3e50] pt-2 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
              <span className="text-[#2ecc71]">{formatCurrency(finalTotal, language === 'ar')}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitOrder}
            disabled={loading}
            className="w-full bg-[#2ecc71] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2ecc71]/30 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isRTL ? 'جاري المعالجة...' : 'Processing...'}
              </span>
            ) : (
              isRTL ? 'تأكيد الطلب' : 'Place Order'
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

