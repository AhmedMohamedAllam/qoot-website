import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import toast from 'react-hot-toast';

export default function ItemModal({ item, isOpen, onClose, isRTL, language }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  const description = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;
  const totalPrice = item.price * quantity;

  const handleAddToCart = () => {
    addItem(item, quantity, notes);
    toast.success(
      isRTL ? `تمت إضافة ${name} إلى السلة` : `Added ${name} to cart`,
      { icon: '🛒' }
    );
    setQuantity(1);
    setNotes('');
    onClose();
  };

  const handleClose = () => {
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg`}
            >
              <FiX size={20} />
            </button>

            {/* Image */}
            <div className="w-full h-64 relative">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-6xl">🍽️</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className="text-2xl font-bold text-[#2c3e50]">{name}</h2>
                <p className="text-gray-500 mt-2">{description}</p>
                <p className="text-2xl font-bold text-[#2ecc71] mt-4">
                  {formatCurrency(item.price, language === 'ar')}
                </p>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'ملاحظات خاصة' : 'Special Instructions'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isRTL ? 'مثال: بدون بصل...' : 'e.g., No onions...'}
                  className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none resize-none ${isRTL ? 'text-right' : ''}`}
                  rows={2}
                />
              </div>

              {/* Quantity & Add to Cart */}
              <div className={`mt-6 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    <FiMinus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`flex-1 bg-[#2ecc71] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#2ecc71]/30 flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span>{isRTL ? 'أضف إلى السلة' : 'Add to Cart'}</span>
                  <span>•</span>
                  <span>{formatCurrency(totalPrice, language === 'ar')}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

