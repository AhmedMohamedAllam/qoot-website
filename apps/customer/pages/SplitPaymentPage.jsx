import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiUsers, FiCreditCard } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { formatCurrency } from '../../../shared/utils/currency';
import toast from 'react-hot-toast';

// Demo order data for split payment
const demoOrderItems = [
  { id: '1', name: 'Mixed Grill Platter', nameAr: 'مشويات مشكلة', price: 180, quantity: 1 },
  { id: '2', name: 'Hummus', nameAr: 'حمص', price: 45, quantity: 2 },
  { id: '3', name: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', price: 25, quantity: 3 },
  { id: '4', name: 'Kofta Kebab', nameAr: 'كفتة كباب', price: 95, quantity: 1 },
  { id: '5', name: 'Om Ali', nameAr: 'أم علي', price: 45, quantity: 2 },
];

export default function SplitPaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  
  const [items] = useState(demoOrderItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Calculate totals
  const TAX_RATE = 0.14;
  const selectedSubtotal = selectedItems.reduce((sum, itemId) => {
    const item = items.find(i => i.id === itemId);
    return sum + (item?.price || 0);
  }, 0);
  const selectedTax = selectedSubtotal * TAX_RATE;
  const selectedTotal = selectedSubtotal + selectedTax;

  // Expand quantity items for individual selection
  const expandedItems = items.flatMap(item => 
    Array.from({ length: item.quantity }, (_, i) => ({
      ...item,
      selectionId: `${item.id}-${i}`,
      displayQuantity: item.quantity > 1 ? `${i + 1}/${item.quantity}` : null
    }))
  );

  const toggleItem = (selectionId) => {
    setSelectedItems(prev => 
      prev.includes(selectionId)
        ? prev.filter(id => id !== selectionId)
        : [...prev, selectionId]
    );
  };

  const handlePayMyShare = async () => {
    if (selectedItems.length === 0) {
      toast.error(isRTL ? 'اختر أصنافك أولاً' : 'Select your items first');
      return;
    }
    
    setLoading(true);
    
    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(
      isRTL ? '🎉 تم الدفع بنجاح!' : '🎉 Payment successful!',
      { duration: 4000 }
    );
    
    setLoading(false);
    setShowPayment(false);
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] text-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <FiArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-bold">
                {isRTL ? 'تقسيم الفاتورة' : 'Split the Bill'}
              </h1>
              <p className="text-white/70 text-sm">
                {isRTL ? 'اختر الأصناف التي طلبتها' : 'Select the items you ordered'}
              </p>
            </div>
          </div>

          {/* Group indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mt-4 flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <FiUsers size={16} />
            <span className="text-sm">
              {isRTL ? '4 أشخاص على الطاولة' : '4 people at table'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Items Selection */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className={`p-4 border-b border-gray-100 ${isRTL ? 'text-right' : ''}`}>
            <h2 className="font-bold text-[#2c3e50]">
              {isRTL ? 'اختر أصنافك' : 'Select Your Items'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isRTL 
                ? 'انقر على الأصناف التي طلبتها'
                : 'Tap on the items you ordered'}
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {expandedItems.map((item, index) => {
              const isSelected = selectedItems.includes(item.selectionId);
              const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
              
              return (
                <motion.button
                  key={item.selectionId}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleItem(item.selectionId)}
                  className={`w-full p-4 flex items-center gap-4 transition-all ${isRTL ? 'flex-row-reverse' : ''} ${
                    isSelected ? 'bg-[#9b59b6]/10' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Checkbox */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-[#9b59b6] border-[#9b59b6]' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <FiCheck size={14} className="text-white" />}
                  </div>

                  {/* Item Info */}
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className={`font-medium ${isSelected ? 'text-[#9b59b6]' : 'text-[#2c3e50]'}`}>
                      {name}
                      {item.displayQuantity && (
                        <span className="text-xs text-gray-400 ml-2">
                          ({item.displayQuantity})
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Price */}
                  <span className={`font-bold ${isSelected ? 'text-[#9b59b6]' : 'text-gray-500'}`}>
                    {formatCurrency(item.price, language === 'ar')}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Payment Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-gray-600">
              {isRTL ? 'تقدم الدفع' : 'Payment Progress'}
            </span>
            <span className="text-sm text-[#9b59b6] font-bold">2/4</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] rounded-full"
            />
          </div>
          <div className={`mt-2 flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {['Ahmed ✓', 'Sara ✓', 'You', 'Mohamed'].map((person, i) => (
              <span 
                key={i}
                className={`text-xs px-2 py-1 rounded-full ${
                  i < 2 
                    ? 'bg-[#2ecc71]/20 text-[#2ecc71]' 
                    : i === 2 
                      ? 'bg-[#9b59b6]/20 text-[#9b59b6]'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {person}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Summary */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="max-w-lg mx-auto px-4 py-4">
              <div className="space-y-2 mb-4">
                <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{isRTL ? 'أصنافك' : 'Your items'} ({selectedItems.length})</span>
                  <span>{formatCurrency(selectedSubtotal, language === 'ar')}</span>
                </div>
                <div className={`flex justify-between text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{isRTL ? 'الضريبة' : 'Tax'}</span>
                  <span>{formatCurrency(selectedTax, language === 'ar')}</span>
                </div>
                <div className={`flex justify-between text-lg font-bold text-[#2c3e50] pt-2 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{isRTL ? 'حصتك' : 'Your Share'}</span>
                  <span className="text-[#9b59b6]">{formatCurrency(selectedTotal, language === 'ar')}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayMyShare}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#9b59b6]/30 flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isRTL ? 'جاري الدفع...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <FiCreditCard size={20} />
                    {isRTL ? 'ادفع حصتي' : 'Pay My Share'}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

