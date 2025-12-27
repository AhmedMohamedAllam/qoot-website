import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiMinus, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { GoldButton, ConfettiExplosion } from './ui';
import toast from 'react-hot-toast';

export default function ItemModal({ item, isOpen, onClose, isRTL, language }) {
  const { addItem } = useCart();
  const dragControls = useDragControls();
  
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageScale, setImageScale] = useState(1);

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setNotes('');
      setShowConfetti(false);
      setIsAdding(false);
      setImageScale(1);
      
      // Ken Burns effect
      const interval = setInterval(() => {
        setImageScale(s => s === 1 ? 1.1 : 1);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [item]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!item) return null;

  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  const description = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;
  const total = item.price * quantity;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate adding delay for effect
    await new Promise(r => setTimeout(r, 300));
    
    addItem({
      ...item,
      quantity,
      notes
    });
    
    setShowConfetti(true);
    
    toast.success(
      isRTL ? `تمت إضافة ${name} إلى السلة` : `Added ${name} to cart`,
      {
        icon: '🛒',
        style: {
          background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
          color: '#0a0a0a',
        }
      }
    );
    
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          <ConfettiExplosion trigger={showConfetti} />

          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
          >
            <div 
              className="rounded-t-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1510 0%, #0a0a0a 100%)'
              }}
            >
              {/* Drag Handle */}
              <div 
                className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-12 h-1 bg-[var(--text-dim)] rounded-full" />
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--text-muted)]"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={20} />
              </motion.button>

              {/* Hero Image with Ken Burns */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={name}
                  className="w-full h-full object-cover"
                  animate={{ scale: imageScale }}
                  transition={{ duration: 8, ease: 'easeInOut' }}
                />
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(26, 21, 16, 0.5) 60%, #1a1510 100%)'
                  }}
                />
                
                {/* Floating price tag */}
                <motion.div
                  className="absolute bottom-4 right-4 price-tag text-lg"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  {formatCurrency(item.price, language === 'ar')}
                </motion.div>
              </div>

              {/* Content */}
              <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {/* Title & Description */}
                <motion.h2
                  className="text-2xl font-black text-[var(--text-primary)] font-display mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {name}
                </motion.h2>
                
                <motion.p
                  className="text-[var(--text-muted)] mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {description}
                </motion.p>

                {/* Quantity Selector */}
                <motion.div
                  className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-[var(--text-secondary)] font-medium">
                    {isRTL ? 'الكمية' : 'Quantity'}
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-subtle)'
                      }}
                      whileHover={{ scale: 1.1, borderColor: 'var(--gold-primary)' }}
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity <= 1}
                    >
                      <FiMinus className="text-[var(--text-secondary)]" />
                    </motion.button>
                    
                    <motion.span
                      key={quantity}
                      className="w-8 text-center text-2xl font-bold text-[var(--gold-primary)]"
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                    >
                      {quantity}
                    </motion.span>
                    
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                        color: '#0a0a0a'
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiPlus strokeWidth={3} />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Special Instructions */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-[var(--text-secondary)] font-medium mb-2">
                    {isRTL ? 'ملاحظات خاصة' : 'Special Instructions'}
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isRTL ? 'مثال: بدون بصل، حار زيادة...' : 'e.g., No onions, extra spicy...'}
                    className="w-full input-glass px-4 py-3 rounded-xl resize-none h-20 text-[var(--text-primary)]"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>

                {/* Add to Cart Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <GoldButton
                    fullWidth
                    size="lg"
                    onClick={handleAddToCart}
                    loading={isAdding}
                    icon={isAdding ? <FiCheck /> : undefined}
                    className="text-lg"
                  >
                    <span className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{isRTL ? 'أضف إلى السلة' : 'Add to Cart'}</span>
                      <span className="font-black">
                        {formatCurrency(total, language === 'ar')}
                      </span>
                    </span>
                  </GoldButton>
                </motion.div>
              </div>

              {/* Safe area padding for mobile */}
              <div className="h-safe-bottom" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
