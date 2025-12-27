import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiPackage, FiCoffee, FiArrowLeft, FiBell } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ParticleBackground, GlassCard, GoldButton } from '../components/ui';

const orderSteps = [
  { 
    id: 'confirmed', 
    icon: FiCheck, 
    title: 'Order Confirmed', 
    titleAr: 'تم تأكيد الطلب',
    description: 'Your order has been received',
    descriptionAr: 'تم استلام طلبك'
  },
  { 
    id: 'preparing', 
    icon: FiCoffee, 
    title: 'Preparing', 
    titleAr: 'جاري التحضير',
    description: 'Chef is preparing your food',
    descriptionAr: 'الشيف يحضر طعامك'
  },
  { 
    id: 'ready', 
    icon: FiPackage, 
    title: 'Ready', 
    titleAr: 'جاهز',
    description: 'Your order is ready',
    descriptionAr: 'طلبك جاهز'
  },
  { 
    id: 'served', 
    icon: FiCheck, 
    title: 'Served', 
    titleAr: 'تم التقديم',
    description: 'Enjoy your meal!',
    descriptionAr: 'بالعافية!'
  },
];

export default function OrderPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(15);

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < orderSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 5000);

    const etaInterval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(etaInterval);
    };
  }, []);

  const handleCallWaiter = () => {
    // In real app, this would notify staff
    alert(isRTL ? 'تم إخطار النادل!' : 'Waiter has been notified!');
  };

  return (
    <div className="min-h-screen relative pb-32">
      <ParticleBackground count={15} />

      {/* Header */}
      <motion.div 
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(16px)'
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button
              onClick={() => navigate('/')}
              className="p-3 glass rounded-xl text-[var(--text-secondary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
            </motion.button>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-black text-[var(--text-primary)] font-display">
                {isRTL ? 'تتبع الطلب' : 'Track Order'}
              </h1>
              <p className="text-sm text-[var(--gold-primary)] font-mono">{orderId}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* ETA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard variant="gold" className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FiClock className="text-[var(--gold-primary)] w-6 h-6" />
              <span className="text-[var(--text-muted)]">
                {isRTL ? 'الوقت المتوقع' : 'Estimated Time'}
              </span>
            </div>
            <motion.div
              key={eta}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-5xl font-black text-gradient-gold font-display"
            >
              {eta}
            </motion.div>
            <span className="text-[var(--text-muted)]">
              {isRTL ? 'دقائق' : 'minutes'}
            </span>
          </GlassCard>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <div className="relative">
              {/* Progress Line */}
              <div 
                className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-6 bottom-6 w-0.5`}
                style={{ background: 'var(--border-subtle)' }}
              >
                <motion.div
                  className="w-full bg-gradient-to-b from-[var(--gold-primary)] to-[var(--gold-dark)]"
                  initial={{ height: '0%' }}
                  animate={{ height: `${(currentStep / (orderSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-8">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <motion.div
                      key={step.id}
                      className={`relative flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Step Icon */}
                      <motion.div
                        className={`
                          relative z-10 w-12 h-12 rounded-xl flex items-center justify-center
                          ${isCurrent ? 'animate-pulse-glow' : ''}
                        `}
                        style={{
                          background: isCompleted
                            ? 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
                            : 'var(--bg-glass)',
                          border: isCompleted ? 'none' : '1px solid var(--border-subtle)'
                        }}
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <Icon 
                          size={20} 
                          className={isCompleted ? 'text-[#0a0a0a]' : 'text-[var(--text-muted)]'} 
                        />
                      </motion.div>

                      {/* Step Content */}
                      <div className={isRTL ? 'text-right' : ''}>
                        <h3 className={`font-bold ${isCompleted ? 'text-[var(--gold-primary)]' : 'text-[var(--text-muted)]'}`}>
                          {language === 'ar' ? step.titleAr : step.title}
                        </h3>
                        <p className="text-sm text-[var(--text-dim)]">
                          {language === 'ar' ? step.descriptionAr : step.description}
                        </p>
                      </div>

                      {/* Current step indicator */}
                      {isCurrent && (
                        <motion.div
                          className={`absolute ${isRTL ? 'left-0' : 'right-0'}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span className="badge-gold">
                            {isRTL ? 'الآن' : 'Now'}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Call Waiter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GoldButton
            fullWidth
            size="lg"
            variant="outline"
            onClick={handleCallWaiter}
            icon={<FiBell />}
          >
            {isRTL ? 'استدعاء النادل' : 'Call Waiter'}
          </GoldButton>
        </motion.div>

        {/* Order More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GoldButton
            fullWidth
            size="lg"
            onClick={() => navigate(-4)}
          >
            {isRTL ? 'طلب المزيد' : 'Order More'}
          </GoldButton>
        </motion.div>
      </div>
    </div>
  );
}
