import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CategoryTabs({ categories, activeCategory, onSelect, isRTL, language }) {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  // Scroll active category into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      
      const scrollLeft = active.offsetLeft - (containerRect.width / 2) + (activeRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div 
      ref={scrollRef}
      className={`flex gap-2 overflow-x-auto scrollbar-hide ${isRTL ? 'flex-row-reverse' : ''}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const name = language === 'ar' && category.nameAr ? category.nameAr : category.name;
        
        return (
          <button
            key={category.id}
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(category.id)}
            className={`
              flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full
              font-medium text-sm transition-all duration-200
              ${isActive 
                ? 'bg-[#2ecc71] text-white shadow-lg shadow-[#2ecc71]/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              ${isRTL ? 'flex-row-reverse' : ''}
            `}
          >
            <span>{category.emoji}</span>
            <span>{name}</span>
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-[#2ecc71] rounded-full -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

