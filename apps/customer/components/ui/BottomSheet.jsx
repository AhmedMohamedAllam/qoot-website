import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children,
  title,
  maxHeight = '90vh'
}) {
  const sheetRef = useRef(null);
  const dragControls = useDragControls();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            className="fixed bottom-0 left-0 right-0 z-[101] touch-none"
            style={{ maxHeight }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
          >
            <div 
              className="bg-gradient-to-b from-[#1a1510] to-[#0a0a0a] rounded-t-3xl overflow-hidden"
              style={{ maxHeight }}
            >
              {/* Handle */}
              <div 
                className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-10 h-1 bg-[var(--text-dim)] rounded-full" />
              </div>

              {/* Title */}
              {title && (
                <div className="px-6 pb-4 border-b border-[var(--border-subtle)]">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] font-display">
                    {title}
                  </h2>
                </div>
              )}

              {/* Content */}
              <div 
                className="overflow-y-auto overscroll-contain"
                style={{ maxHeight: `calc(${maxHeight} - 60px)` }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

