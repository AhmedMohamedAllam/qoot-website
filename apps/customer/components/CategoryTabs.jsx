import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CategoryTabs({ 
  categories, 
  activeCategory, 
  onSelect, 
  isRTL, 
  language 
}) {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  // Auto-scroll to active category
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      
      const scrollLeft = activeRect.left - containerRect.left - (containerRect.width / 2) + (activeRect.width / 2);
      container.scrollBy({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div 
      ref={scrollRef}
      className={`flex gap-2 overflow-x-auto scrollbar-hide py-2 ${isRTL ? 'flex-row-reverse' : ''}`}
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const name = language === 'ar' && category.nameAr ? category.nameAr : category.name;
        
        return (
          <motion.button
            key={category.id}
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(category.id)}
            className={`
              relative flex items-center gap-2 px-5 py-2.5 rounded-full
              whitespace-nowrap font-medium text-sm
              transition-all duration-300
              ${isRTL ? 'flex-row-reverse' : ''}
            `}
            style={{
              background: isActive 
                ? 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
                : 'var(--bg-glass)',
              color: isActive ? '#0a0a0a' : 'var(--text-secondary)',
              border: isActive ? 'none' : '1px solid var(--border-subtle)',
              boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
              scrollSnapAlign: 'center'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: isActive ? 'var(--shadow-gold)' : 'var(--shadow-glow)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{category.emoji}</span>
            <span>{name}</span>
            
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="activeDot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--gold-light)]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
