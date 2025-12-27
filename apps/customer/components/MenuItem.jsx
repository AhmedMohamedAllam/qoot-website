import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { formatCurrency } from '../../../shared/utils/currency';

export default function MenuItem({ item, onClick, isRTL, language, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  const description = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', damping: 20, stiffness: 100 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(16px)'
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Image Container */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          
          {/* Image with zoom effect */}
          <motion.img
            src={item.image}
            alt={name}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-[#0a0a0a]/50`}
          />
          
          {/* Out of stock overlay */}
          {!item.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-red-500/80 px-3 py-1 rounded-full">
                {isRTL ? 'غير متوفر' : 'Sold Out'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-lg font-display leading-tight mb-1">
              {name}
            </h3>
            <p className="text-[var(--text-muted)] text-sm line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className={`flex items-center justify-between mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Price Tag */}
            <motion.span
              className="price-tag"
              animate={{ 
                boxShadow: isHovered 
                  ? '0 4px 20px rgba(212, 175, 55, 0.4)' 
                  : 'var(--shadow-gold)'
              }}
            >
              {formatCurrency(item.price, language === 'ar')}
            </motion.span>
            
            {/* Add Button */}
            {item.available && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                  color: '#0a0a0a',
                  boxShadow: 'var(--shadow-gold)'
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlus size={20} strokeWidth={3} />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? 'inset 0 0 30px rgba(212, 175, 55, 0.1)' 
            : 'inset 0 0 0 rgba(212, 175, 55, 0)'
        }}
      />
    </motion.div>
  );
}
