import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiUsers, FiDivide, FiCheck, FiShare2, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { ParticleBackground, GlassCard, GoldButton } from '../components/ui';

// Simulated participants for demo
const demoParticipants = [
  { id: 1, name: 'You', nameAr: 'أنت', paid: false, amount: 0, isCurrentUser: true },
];

export default function SplitPaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL, language } = useLanguage();
  const { total: cartTotal, items, tableNumber, restaurantId } = useCart();
  
  const [splitCount, setSplitCount] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState('equal');
  const [participants, setParticipants] = useState(demoParticipants);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [myShare, setMyShare] = useState(0);
  
  // Use cart total or demo value
  const total = cartTotal || 450;
  const splitAmount = total / splitCount;
  
  // Generate share link
  const shareLink = `${window.location.origin}/join-bill/${restaurantId || 'demo'}/${tableNumber || '1'}?split=${splitCount}`;
  
  useEffect(() => {
    setMyShare(splitAmount);
  }, [splitAmount]);

  const splitMethods = [
    { 
      id: 'equal', 
      icon: FiDivide, 
      name: 'Split Equally', 
      nameAr: 'تقسيم بالتساوي',
      desc: 'Everyone pays the same',
      descAr: 'الجميع يدفع نفس المبلغ'
    },
    { 
      id: 'items', 
      icon: FiUsers, 
      name: 'Pay for Items', 
      nameAr: 'ادفع حسب الطلب',
      desc: 'Select what you ordered',
      descAr: 'اختر ما طلبته'
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isRTL ? 'قسّم الفاتورة معي' : 'Split the bill with me',
          text: isRTL 
            ? `انضم لتقسيم فاتورة بقيمة ${formatCurrency(total, true)}` 
            : `Join me to split a bill of ${formatCurrency(total, false)}`,
          url: shareLink,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setShowQR(true);
    }
  };

  const handlePayMyShare = () => {
    // Navigate to checkout with the user's share amount
    navigate(`/checkout?payment=now&amount=${myShare}&split=true`);
  };

  return (
    <div className="min-h-screen relative pb-40">
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
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <motion.button
                onClick={() => navigate(-1)}
                className="p-3 glass rounded-xl text-[var(--text-secondary)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
              </motion.button>
              <div className={isRTL ? 'text-right' : ''}>
                <h1 className="text-2xl font-black text-[var(--text-primary)] font-display">
                  {isRTL ? 'تقسيم الفاتورة' : 'Split Bill'}
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  {isRTL ? `طاولة ${tableNumber || 1}` : `Table ${tableNumber || 1}`}
                </p>
              </div>
            </div>
            
            {/* Share Button */}
            <motion.button
              onClick={handleShare}
              className="p-3 rounded-xl flex items-center gap-2"
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-primary)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShare2 size={18} />
              <span className="text-sm font-semibold hidden sm:inline">
                {isRTL ? 'شارك' : 'Share'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Total Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard variant="gold" className="p-6 text-center">
            <p className="text-[var(--text-muted)] mb-2">
              {isRTL ? 'إجمالي الفاتورة' : 'Total Bill'}
            </p>
            <p className="text-4xl font-black text-gradient-gold font-display">
              {formatCurrency(total, language === 'ar')}
            </p>
          </GlassCard>
        </motion.div>

        {/* Split Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'طريقة التقسيم' : 'Split Method'}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {splitMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <motion.button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative p-4 rounded-2xl text-center transition-all`}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)'
                      : 'var(--bg-glass)',
                    border: isSelected 
                      ? '2px solid var(--gold-primary)'
                      : '1px solid var(--border-subtle)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
                        : 'var(--bg-glass)'
                    }}
                  >
                    <Icon size={24} className={isSelected ? 'text-[#0a0a0a]' : 'text-[var(--text-muted)]'} />
                  </div>
                  <span className={`font-semibold block ${isSelected ? 'text-[var(--gold-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {language === 'ar' ? method.nameAr : method.name}
                  </span>
                  <span className="text-xs text-[var(--text-dim)] mt-1 block">
                    {language === 'ar' ? method.descAr : method.desc}
                  </span>
                  
                  {isSelected && (
                    <motion.div
                      layoutId="splitCheck"
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--gold-primary)' }}
                    >
                      <FiCheck size={14} className="text-[#0a0a0a]" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Number of People */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'عدد الأشخاص' : 'Number of People'}
          </h2>
          <GlassCard className="p-6">
            <div className="flex items-center justify-center gap-6">
              <motion.button
                onClick={() => setSplitCount(Math.max(2, splitCount - 1))}
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-[var(--text-secondary)]"
                style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              
              <motion.span
                key={splitCount}
                className="text-5xl font-black text-[var(--gold-primary)] font-display w-20 text-center"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
              >
                {splitCount}
              </motion.span>
              
              <motion.button
                onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                  color: '#0a0a0a'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Share QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'شارك مع أصدقائك' : 'Share with Friends'}
          </h2>
          <GlassCard className="p-6">
            <div className="text-center">
              {/* QR Code */}
              <div 
                className="inline-block p-4 rounded-2xl mb-4"
                style={{ background: 'white' }}
              >
                <QRCodeSVG 
                  value={shareLink}
                  size={150}
                  level="H"
                  includeMargin={false}
                  fgColor="#0a0a0a"
                  bgColor="white"
                />
              </div>
              
              <p className="text-[var(--text-muted)] text-sm mb-4">
                {isRTL 
                  ? 'اطلب من أصدقائك مسح الرمز للانضمام والدفع'
                  : 'Ask friends to scan this code to join and pay'}
              </p>
              
              {/* Copy Link Button */}
              <motion.button
                onClick={handleCopyLink}
                className={`
                  w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2
                  ${isRTL ? 'flex-row-reverse' : ''}
                `}
                style={{
                  background: copied ? 'var(--gold-subtle)' : 'var(--bg-glass)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--gold-primary)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <>
                    <FiCheckCircle size={18} />
                    <span className="font-semibold">{isRTL ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={18} />
                    <span className="font-semibold">{isRTL ? 'نسخ الرابط' : 'Copy Link'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Your Share Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="gold" className="p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-[var(--text-muted)] text-sm">
                  {isRTL ? 'حصتك من الفاتورة' : 'Your Share'}
                </p>
                <motion.p
                  key={splitAmount}
                  className="text-3xl font-black text-gradient-gold font-display"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  {formatCurrency(splitAmount, language === 'ar')}
                </motion.p>
              </div>
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
                }}
              >
                💰
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Participants Status (for demo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className={`text-lg font-bold text-[var(--text-primary)] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'حالة الدفع' : 'Payment Status'}
          </h2>
          <GlassCard className="p-4">
            <div className="space-y-3">
              {/* Current user */}
              <div 
                className={`flex items-center justify-between p-3 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ background: 'var(--bg-glass)' }}
              >
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: 'var(--gold-primary)', color: '#0a0a0a' }}
                  >
                    👤
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="font-semibold text-[var(--text-primary)]">
                      {isRTL ? 'أنت' : 'You'}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {formatCurrency(splitAmount, language === 'ar')}
                    </p>
                  </div>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'var(--gold-subtle)', color: 'var(--gold-primary)' }}
                >
                  {isRTL ? 'في انتظار الدفع' : 'Pending'}
                </span>
              </div>
              
              {/* Waiting for others */}
              {Array.from({ length: splitCount - 1 }).map((_, i) => (
                <div 
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                  style={{ background: 'var(--bg-glass)', opacity: 0.6 }}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <FiUsers className="text-[var(--text-dim)]" size={18} />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="font-semibold text-[var(--text-muted)]">
                        {isRTL ? `شخص ${i + 2}` : `Person ${i + 2}`}
                      </p>
                      <p className="text-xs text-[var(--text-dim)]">
                        {isRTL ? 'في انتظار الانضمام...' : 'Waiting to join...'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Fixed Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.95) 30%, #0a0a0a 100%)'
        }}
      >
        <div className="max-w-lg mx-auto">
          <GoldButton
            fullWidth
            size="lg"
            onClick={handlePayMyShare}
          >
            <span className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{isRTL ? 'ادفع حصتك' : 'Pay Your Share'}</span>
              <span className="opacity-75">({formatCurrency(splitAmount, language === 'ar')})</span>
            </span>
          </GoldButton>
          <p className="text-center text-xs text-[var(--text-dim)] mt-2">
            {isRTL 
              ? '💡 سيتم إخطار الآخرين عند دفع حصتك'
              : '💡 Others will be notified when you pay your share'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
