import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiSmartphone, FiZap, FiClock, FiWifi } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ParticleBackground, GlassCard, GoldButton, AnimatedText, GlowText } from '../components/ui';

// Animated QR Code Component
function AnimatedQRCode({ isRTL }) {
  return (
    <motion.div 
      className="relative w-full aspect-square max-w-[180px] mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Scanning line animation */}
      <motion.div
        className="absolute left-2 right-2 h-1 rounded-full z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
          boxShadow: '0 0 20px var(--gold-primary), 0 0 40px var(--gold-primary)'
        }}
        animate={{
          top: ['10%', '85%', '10%']
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* QR Code Frame */}
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          border: '2px solid var(--gold-primary)',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.1)'
        }}
      >
        {/* Corner brackets */}
        {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 left-0 -rotate-90', 'bottom-0 right-0 rotate-180'].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-8 h-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gold-primary)]" />
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--gold-primary)]" />
          </motion.div>
        ))}
        
        {/* QR Code Pattern */}
        <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-1 p-2">
          {Array.from({ length: 49 }).map((_, i) => {
            const isCorner = (i < 3 || (i >= 4 && i < 7)) && (Math.floor(i / 7) < 3) ||
                            (i % 7 < 3 && Math.floor(i / 7) < 3) ||
                            (i % 7 >= 4 && Math.floor(i / 7) < 3) ||
                            (i % 7 < 3 && Math.floor(i / 7) >= 4);
            const shouldFill = Math.random() > 0.5 || isCorner;
            
            return (
              <motion.div
                key={i}
                className="rounded-sm"
                style={{
                  background: shouldFill ? 'var(--gold-primary)' : 'transparent'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: shouldFill ? 0.8 : 0, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.01 }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}

// Animated NFC Component
function AnimatedNFC({ isRTL }) {
  return (
    <motion.div 
      className="relative w-full aspect-square max-w-[180px] mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Ripple waves - using CSS animations for smoother performance */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-[var(--gold-primary)]"
            style={{ 
              width: '50px',
              height: '50px',
              animation: `ripple 2.5s ease-out infinite`,
              animationDelay: `${i * 0.5}s`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>
      
      {/* Phone with NFC icon */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Phone shape */}
        <div 
          className="relative w-20 h-32 rounded-2xl flex items-center justify-center z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            border: '2px solid var(--gold-primary)',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)'
          }}
        >
          {/* Screen */}
          <div 
            className="absolute inset-2 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,10,0.9) 0%, rgba(26,21,16,0.9) 100%)'
            }}
          >
            {/* NFC icon */}
            <div className="w-full h-full flex items-center justify-center">
              <FiWifi 
                className="text-[var(--gold-primary)]" 
                size={28}
                style={{ transform: 'rotate(45deg)' }}
              />
            </div>
          </div>
          
          {/* Phone notch */}
          <div 
            className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
            style={{ background: 'var(--gold-primary)', opacity: 0.5 }}
          />
        </div>
        
        {/* Tap indicator shadow */}
        <div
          className="absolute -bottom-2 w-16 h-4 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(ellipse, var(--gold-primary) 0%, transparent 70%)',
            filter: 'blur(4px)'
          }}
        />
      </motion.div>
      
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* CSS for ripple animation */}
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}

// Option Card Component
function OptionCard({ type, isRTL, isActive, onClick }) {
  const isQR = type === 'qr';
  
  const content = {
    qr: {
      title: isRTL ? 'امسح رمز QR' : 'Scan QR Code',
      subtitle: isRTL ? 'وجّه الكاميرا نحو الرمز' : 'Point camera at code',
      icon: <FiCamera size={20} />
    },
    nfc: {
      title: isRTL ? 'المس بـ NFC' : 'Tap with NFC',
      subtitle: isRTL ? 'قرّب هاتفك من الشريحة' : 'Hold phone near chip',
      icon: <FiWifi size={20} className="rotate-45" />
    }
  };

  const data = content[type];

  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-300 ${isActive ? 'z-10' : 'z-0'}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative rounded-3xl overflow-hidden p-6"
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)'
            : 'var(--bg-glass)',
          border: isActive 
            ? '2px solid var(--gold-primary)' 
            : '1px solid var(--border-light)',
          boxShadow: isActive 
            ? '0 0 40px rgba(212, 175, 55, 0.2), inset 0 0 30px rgba(212, 175, 55, 0.05)'
            : 'none'
        }}
      >
        {/* Animated content */}
        <div className="mb-4">
          {isQR ? <AnimatedQRCode isRTL={isRTL} /> : <AnimatedNFC isRTL={isRTL} />}
        </div>
        
        {/* Title */}
        <div className={`text-center ${isActive ? '' : 'opacity-60'}`}>
          <div className={`flex items-center justify-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-[var(--gold-primary)]">{data.icon}</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">
              {data.title}
            </h3>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            {data.subtitle}
          </p>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
            style={{ background: 'var(--gold-primary)' }}
            layoutId="activeIndicator"
          />
        )}
      </div>
    </motion.div>
  );
}

// Floating instruction indicator
function FloatingInstruction({ isRTL }) {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 px-6 py-3 rounded-full"
      style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
        border: '1px solid var(--gold-primary)',
        boxShadow: '0 4px 30px rgba(212, 175, 55, 0.2)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {/* Animated arrow */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--gold-primary)" 
          strokeWidth="2"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
      
      <span className="text-[var(--gold-primary)] font-semibold text-sm">
        {isRTL ? 'ابدأ بمسح الرمز أو لمس الشريحة' : 'Start by scanning or tapping'}
      </span>
      
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--gold-primary)" 
          strokeWidth="2"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { isRTL, toggleLanguage } = useLanguage();
  const [activeOption, setActiveOption] = useState('qr');

  // Auto-switch between QR and NFC for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOption(prev => prev === 'qr' ? 'nfc' : 'qr');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden grain-overlay">
      {/* Animated Background */}
      <ParticleBackground count={50} />
      
      {/* Ambient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Language Toggle */}
        <motion.button
          variants={itemVariants}
          onClick={toggleLanguage}
          className="absolute top-4 right-4 px-4 py-2 glass rounded-full text-sm font-medium text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors"
        >
          {isRTL ? 'English' : 'عربي'}
        </motion.button>

        {/* Logo */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
              filter: 'blur(25px)',
              transform: 'scale(1.8)'
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1.6, 1.9, 1.6]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <motion.div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
              boxShadow: 'var(--shadow-gold)'
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <span className="text-4xl font-black text-[#0a0a0a] font-display">Q</span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-black font-display">
            <GlowText>
              <AnimatedText 
                text={isRTL ? 'قوت' : 'QOOT'} 
                className="text-gradient-gold"
                staggerDelay={0.08}
              />
            </GlowText>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-[var(--text-secondary)] text-center mb-6"
        >
          {isRTL ? 'تجربة طعام رقمية فاخرة' : 'Luxury Digital Dining'}
        </motion.p>

        {/* Instruction indicator */}
        <motion.div variants={itemVariants} className="mb-6">
          <FloatingInstruction isRTL={isRTL} />
        </motion.div>

        {/* QR & NFC Options */}
        <motion.div 
          variants={itemVariants} 
          className={`w-full max-w-lg grid grid-cols-2 gap-4 mb-8 ${isRTL ? 'direction-rtl' : ''}`}
        >
          <OptionCard 
            type="qr" 
            isRTL={isRTL} 
            isActive={activeOption === 'qr'}
            onClick={() => setActiveOption('qr')}
          />
          <OptionCard 
            type="nfc" 
            isRTL={isRTL} 
            isActive={activeOption === 'nfc'}
            onClick={() => setActiveOption('nfc')}
          />
        </motion.div>

        {/* OR Divider */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-4 mb-6 w-full max-w-xs"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
          <span className="text-[var(--text-dim)] text-sm font-medium">
            {isRTL ? 'أو' : 'OR'}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
        </motion.div>

        {/* Demo Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={() => navigate('/menu/demo-restaurant/1')}
            className="relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden group"
            style={{
              background: 'transparent',
              border: '2px solid var(--gold-primary)',
              color: 'var(--gold-primary)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover fill effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'var(--gold-primary)' }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors flex items-center gap-2">
              <FiZap className="group-hover:animate-pulse" />
              {isRTL ? 'جرب العرض التجريبي' : 'Try Demo Experience'}
            </span>
          </motion.button>
        </motion.div>

        {/* Feature badges */}
        <motion.div 
          variants={itemVariants}
          className={`flex justify-center gap-6 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {[
            { icon: <FiZap size={16} />, text: isRTL ? 'فوري' : 'Instant' },
            { icon: <FiSmartphone size={16} />, text: isRTL ? 'بدون تطبيق' : 'No App' },
            { icon: <FiClock size={16} />, text: isRTL ? 'سهل' : 'Easy' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-2 text-[var(--text-muted)] text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
              whileHover={{ color: 'var(--gold-primary)' }}
            >
              <span className="text-[var(--gold-primary)]">{feature.icon}</span>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-4 text-center"
        >
          <p className="text-[var(--text-dim)] text-xs">
            Powered by <span className="text-gradient-gold font-bold">Qoot</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
