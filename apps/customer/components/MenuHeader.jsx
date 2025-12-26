import { motion } from 'framer-motion';
import { FiMapPin, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function MenuHeader({ restaurant, tableNumber, isRTL, language }) {
  const { toggleLanguage } = useLanguage();
  
  const name = language === 'ar' && restaurant?.nameAr ? restaurant.nameAr : restaurant?.name;
  const description = language === 'ar' && restaurant?.descriptionAr ? restaurant.descriptionAr : restaurant?.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white"
    >
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Restaurant Info */}
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <div className="w-16 h-16 bg-[#2ecc71] rounded-2xl flex items-center justify-center shadow-lg">
              {restaurant?.logo ? (
                <img src={restaurant.logo} alt={name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="text-white text-2xl font-black">
                  {name?.charAt(0) || 'Q'}
                </span>
              )}
            </div>
            
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-bold">{name}</h1>
              {description && (
                <p className="text-white/60 text-sm mt-1">{description}</p>
              )}
            </div>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FiGlobe size={20} />
          </button>
        </div>

        {/* Table Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2ecc71]/20 border border-[#2ecc71]/30 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <FiMapPin className="text-[#2ecc71]" size={16} />
          <span className="text-[#2ecc71] font-semibold text-sm">
            {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

