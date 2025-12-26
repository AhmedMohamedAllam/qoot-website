import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';

export default function CartPage() {
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  const { items, updateQuantity, removeItem, subtotal, tax, total, isEmpty, tableNumber } = useCart();

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FiShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">
            {isRTL ? 'السلة فارغة' : 'Your cart is empty'}
          </h2>
          <p className="text-gray-500 mb-6">
            {isRTL ? 'أضف بعض الأصناف اللذيذة من القائمة' : 'Add some delicious items from the menu'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#2ecc71] text-white rounded-xl font-semibold"
          >
            {isRTL ? 'العودة للقائمة' : 'Back to Menu'}
          </button>
        </motion.div>
      </div>
    );
  }

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
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-bold text-[#2c3e50]">
                {isRTL ? 'السلة' : 'Your Cart'}
              </h1>
              <p className="text-sm text-gray-500">
                {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {items.map((item, index) => {
          const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
          
          return (
            <motion.div
              key={item.cartId}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl">🍽️</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="font-bold text-[#2c3e50]">{name}</h3>
                {item.notes && (
                  <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                )}
                <p className="text-[#2ecc71] font-bold mt-2">
                  {formatCurrency(item.price * item.quantity, language === 'ar')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 size={18} />
                </button>
                
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Order Summary */}
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
            <div className={`flex justify-between text-lg font-bold text-[#2c3e50] pt-2 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
              <span className="text-[#2ecc71]">{formatCurrency(total, language === 'ar')}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#2ecc71] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2ecc71]/30"
          >
            {isRTL ? 'إتمام الطلب' : 'Proceed to Checkout'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

