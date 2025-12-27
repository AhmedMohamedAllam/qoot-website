import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ParticleBackground, GlassCard, GoldButton, ConfettiExplosion, TypewriterText } from '../components/ui';

export default function SuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    // Trigger animations in sequence
    const timer1 = setTimeout(() => setCheckComplete(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6">
      <ParticleBackground count={30} />
      <ConfettiExplosion trigger={showConfetti} particleCount={80} />

      <motion.div
        className="relative z-10 text-center max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Checkmark */}
        <div className="relative mx-auto mb-8">
          {/* Outer glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: 120,
              height: 120,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Check circle */}
          <motion.div
            className="relative w-28 h-28 mx-auto rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
              boxShadow: 'var(--shadow-gold)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {/* Animated check icon */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20 6L9 17L4 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: checkComplete ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-black text-[var(--text-primary)] font-display mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {isRTL ? 'تم الطلب بنجاح!' : 'Order Confirmed!'}
        </motion.h1>

        {/* Order ID with typewriter effect */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[var(--text-muted)] mb-2">
            {isRTL ? 'رقم الطلب' : 'Order Number'}
          </p>
          <div 
            className="inline-block px-6 py-3 rounded-xl font-mono text-xl font-bold"
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-light)'
            }}
          >
            <TypewriterText text={orderId} delay={1} speed={80} cursor={false} />
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <GlassCard className="p-6 mb-6">
            <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}
              >
                <FiClock className="text-[var(--success)] w-6 h-6" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-[var(--text-muted)] text-sm">
                  {isRTL ? 'الوقت المتوقع' : 'Estimated Time'}
                </p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  15-20 {isRTL ? 'دقيقة' : 'min'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gold-subtle)' }}
              >
                <FiMapPin className="text-[var(--gold-primary)] w-6 h-6" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-[var(--text-muted)] text-sm">
                  {isRTL ? 'سيتم التوصيل إلى' : 'Delivering to'}
                </p>
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  {isRTL ? 'طاولتك' : 'Your Table'}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <GoldButton
            fullWidth
            size="lg"
            onClick={() => navigate(`/order/${orderId}`)}
          >
            {isRTL ? 'تتبع الطلب' : 'Track Order'}
          </GoldButton>
          
          <GoldButton
            fullWidth
            size="lg"
            variant="outline"
            onClick={() => navigate(-3)}
          >
            {isRTL ? 'طلب المزيد' : 'Order More'}
          </GoldButton>
        </motion.div>

        {/* Thank you message */}
        <motion.p
          className="mt-8 text-[var(--text-dim)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {isRTL ? 'شكراً لاختيارك قوت ✨' : 'Thank you for choosing Qoot ✨'}
        </motion.p>
      </motion.div>
    </div>
  );
}
