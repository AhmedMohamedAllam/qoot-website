import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiGlobe, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function MenuHeader({ restaurant, tableNumber, isRTL, language }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effect
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const name = language === 'ar' && restaurant?.nameAr ? restaurant.nameAr : restaurant?.name;
  const description = language === 'ar' && restaurant?.descriptionAr ? restaurant.descriptionAr : restaurant?.description;

  // Demo hero image
  const heroImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80';

  return (
    <div ref={ref} className="relative h-72 overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(10, 10, 10, 0.3) 0%, 
                rgba(10, 10, 10, 0.5) 50%,
                rgba(10, 10, 10, 0.95) 100%
              )
            `
          }}
        />
        {/* Golden accent glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-32"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* Language Toggle */}
      <motion.button
        style={{ opacity }}
        onClick={() => {}}
        className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 glass rounded-full px-4 py-2 flex items-center gap-2`}
      >
        <FiGlobe className="text-[var(--gold-primary)]" />
        <span className="text-sm text-[var(--text-secondary)]">
          {isRTL ? 'English' : 'عربي'}
        </span>
      </motion.button>

      {/* Content */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ opacity }}
      >
        {/* Restaurant Logo */}
        <motion.div
          className={`inline-flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
              color: '#0a0a0a',
              boxShadow: 'var(--shadow-gold)'
            }}
          >
            {name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-[var(--text-primary)] font-display">
              {name}
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Table Badge */}
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{
            background: 'var(--gold-subtle)',
            border: '1px solid var(--border-gold)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FiMapPin className="text-[var(--gold-primary)]" />
          <span className="text-[var(--gold-light)] font-medium">
            {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
