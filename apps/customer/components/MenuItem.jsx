import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { formatCurrency } from '../../../shared/utils/currency';

export default function MenuItem({ item, onClick, isRTL, language, delay = 0 }) {
  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  const description = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md
        transition-all duration-200 cursor-pointer
        flex ${isRTL ? 'flex-row-reverse' : ''}
      `}
    >
      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-red-500 px-2 py-1 rounded">
              {isRTL ? 'غير متوفر' : 'Sold Out'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 p-3 flex flex-col justify-between ${isRTL ? 'text-right' : ''}`}>
        <div>
          <h3 className="font-bold text-[#2c3e50] text-base leading-tight">{name}</h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{description}</p>
        </div>
        
        <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-bold text-[#2ecc71]">
            {formatCurrency(item.price, language === 'ar')}
          </span>
          
          {item.available && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="w-8 h-8 bg-[#2ecc71] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#2ecc71]/30"
            >
              <FiPlus size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

