import { motion } from 'framer-motion';
import { FiClock, FiCheck, FiAlertCircle, FiZap, FiMonitor } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function KitchenDisplay() {
  const { isRTL } = useLanguage();

  const orders = [
    {
      id: '7',
      table: isRTL ? 'طاولة ٧' : 'Table 7',
      time: '4:32',
      status: 'cooking',
      items: [
        { name: '🍔 Classic Burger', qty: 2, done: true },
        { name: '🍟 Crispy Fries', qty: 2, done: false },
        { name: '🥤 Cola', qty: 2, done: true },
      ],
      priority: 'normal',
    },
    {
      id: '8',
      table: isRTL ? 'طاولة ٨' : 'Table 8',
      time: '2:15',
      status: 'new',
      items: [
        { name: '🍕 Margherita Pizza', qty: 1, done: false },
        { name: '🥗 Caesar Salad', qty: 1, done: false },
      ],
      priority: 'rush',
    },
    {
      id: '6',
      table: isRTL ? 'طاولة ٦' : 'Table 6',
      time: '0:00',
      status: 'ready',
      items: [
        { name: '🍝 Pasta Carbonara', qty: 1, done: true },
        { name: '🍞 Garlic Bread', qty: 2, done: true },
      ],
      priority: 'normal',
    },
    {
      id: '9',
      table: isRTL ? 'طاولة ٩' : 'Table 9',
      time: '6:45',
      status: 'cooking',
      items: [
        { name: '🥩 Steak Medium', qty: 1, done: false },
        { name: '🥔 Mashed Potatoes', qty: 1, done: true },
        { name: '🍷 Red Wine', qty: 2, done: true },
      ],
      priority: 'normal',
    },
  ];

  const statusConfig = {
    new: { 
      bg: 'from-blue-500/20 to-blue-600/20', 
      border: 'border-blue-500/50',
      badge: 'bg-blue-500',
      label: isRTL ? 'جديد' : 'NEW',
      icon: FiZap,
    },
    cooking: { 
      bg: 'from-yellow-500/20 to-orange-500/20', 
      border: 'border-yellow-500/50',
      badge: 'bg-yellow-500',
      label: isRTL ? 'قيد التحضير' : 'COOKING',
      icon: FiClock,
    },
    ready: { 
      bg: 'from-green-500/20 to-emerald-500/20', 
      border: 'border-green-500/50',
      badge: 'bg-green-500',
      label: isRTL ? 'جاهز!' : 'READY!',
      icon: FiCheck,
    },
  };

  return (
    <section className="py-24 bg-[#0a0f14] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6"
          >
            <FiMonitor className="w-5 h-5" />
            {isRTL ? 'شاشة المطبخ' : 'Kitchen Display System'}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {isRTL ? (
              <>مطبخك <span className="text-yellow-400">بدون فوضى</span></>
            ) : (
              <>Your Kitchen, <span className="text-yellow-400">Zero Chaos</span></>
            )}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {isRTL 
              ? 'شاشة عرض ذكية للمطبخ تُنظم الطلبات، تتتبع وقت التحضير، وتضمن عدم ضياع أي طلب'
              : 'A smart kitchen display that organizes orders, tracks prep time, and ensures no order is ever lost'}
          </p>
        </motion.div>

        {/* KDS Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Monitor Frame */}
          <div className="bg-[#0a0a0a] rounded-3xl p-4 shadow-2xl border border-white/10">
            {/* Screen */}
            <div className="bg-[#1a252f] rounded-2xl overflow-hidden">
              {/* KDS Header */}
              <div className={`bg-gradient-to-r from-[#2c3e50] to-[#34495e] p-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-2xl">🍳</span>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="text-xl font-bold text-white">{isRTL ? 'شاشة المطبخ' : 'Kitchen Display'}</h3>
                    <p className="text-sm text-white/60">{isRTL ? 'طلبات نشطة: ٤' : 'Active Orders: 4'}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="px-3 py-1 bg-green-500/20 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-bold">{isRTL ? 'مباشر' : 'LIVE'}</span>
                  </div>
                  <div className="text-white/60 text-sm">
                    {new Date().toLocaleTimeString(isRTL ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Orders Grid */}
              <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {orders.map((order, index) => {
                  const config = statusConfig[order.status];
                  const StatusIcon = config.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative p-4 rounded-2xl bg-gradient-to-br ${config.bg} border-2 ${config.border}`}
                    >
                      {/* Rush Badge */}
                      {order.priority === 'rush' && (
                        <motion.div
                          className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} px-2 py-1 bg-red-500 rounded-full text-white text-xs font-bold`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          🔥 {isRTL ? 'مستعجل' : 'RUSH'}
                        </motion.div>
                      )}

                      {/* Order Header */}
                      <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div>
                          <span className="text-white font-black text-xl">#{order.id}</span>
                          <p className="text-white/60 text-xs">{order.table}</p>
                        </div>
                        <div className={`flex items-center gap-1 ${order.status === 'cooking' ? 'text-yellow-400' : order.status === 'ready' ? 'text-green-400' : 'text-blue-400'}`}>
                          <FiClock className="w-4 h-4" />
                          <span className="text-sm font-bold">{order.time}</span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div 
                            key={i}
                            className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              item.done ? 'bg-green-500' : 'bg-white/20'
                            }`}>
                              {item.done ? (
                                <FiCheck className="w-3 h-3 text-white" />
                              ) : (
                                <span className="text-white/60 text-xs">{item.qty}</span>
                              )}
                            </div>
                            <span className={`text-sm ${item.done ? 'text-white/50 line-through' : 'text-white'}`}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Status Badge */}
                      <motion.button
                        className={`w-full py-2 ${config.badge} rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={order.status === 'ready' ? { scale: [1, 1.02, 1] } : {}}
                        transition={order.status === 'ready' ? { duration: 0.5, repeat: Infinity } : {}}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats Bar */}
              <div className={`p-4 bg-[#0d1117] border-t border-white/10 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-400">3</p>
                    <p className="text-xs text-white/40">{isRTL ? 'جديد' : 'New'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-yellow-400">8</p>
                    <p className="text-xs text-white/40">{isRTL ? 'قيد التحضير' : 'Cooking'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-green-400">12</p>
                    <p className="text-xs text-white/40">{isRTL ? 'مكتمل' : 'Done'}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">4:23</p>
                    <p className="text-xs text-white/40">{isRTL ? 'متوسط الوقت' : 'Avg. Time'}</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-400">98%</p>
                    <p className="text-xs text-white/40">{isRTL ? 'في الوقت' : 'On Time'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor Stand */}
          <div className="flex justify-center">
            <div className="w-32 h-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-xl" />
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-4 bg-[#0a0a0a] rounded-full shadow-2xl" />
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '📋', title: isRTL ? 'صفر ورق' : 'Zero Paper', desc: isRTL ? 'وداعاً للتذاكر الضائعة' : 'No more lost tickets' },
            { icon: '⚡', title: isRTL ? 'تحديث فوري' : 'Real-time', desc: isRTL ? 'الطلبات تظهر مباشرة' : 'Orders appear instantly' },
            { icon: '🎯', title: isRTL ? 'أولوية ذكية' : 'Smart Priority', desc: isRTL ? 'الطلبات العاجلة أولاً' : 'Rush orders first' },
            { icon: '📊', title: isRTL ? 'تتبع الأداء' : 'Performance', desc: isRTL ? 'قياس سرعة التحضير' : 'Track prep times' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <span className="text-4xl">{benefit.icon}</span>
              <h4 className="text-lg font-bold text-white mt-3">{benefit.title}</h4>
              <p className="text-sm text-white/50 mt-1">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

