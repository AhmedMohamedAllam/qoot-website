import { motion } from 'framer-motion';
import { HiArrowDown, HiPlay } from 'react-icons/hi';

export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#2ecc71]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2ecc71]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2ecc71]/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232ecc71%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8"
        >
          <span className="w-2 h-2 bg-[#2ecc71] rounded-full mr-2 animate-pulse" />
          Launching in New Cairo & Madinaty
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
        >
          <span className="block">QOOT</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light mb-4"
        >
          Smart Menus. Smart Payments.{' '}
          <span className="text-[#2ecc71] font-semibold">Smarter Dining.</span>
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-12"
        >
          The complete digital dining ecosystem for Egyptian restaurants. 
          Transform your customer experience from order to payment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="group px-8 py-4 bg-[#2ecc71] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Demo
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('#solution')}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiPlay className="mr-2 text-[#2ecc71]" />
            See How It Works
          </motion.button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '20%', label: 'Faster Turnover' },
            { value: '15%', label: 'Higher Revenue' },
            { value: '30%', label: 'Cost Savings' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#2ecc71]">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => scrollToSection('#problem')}
          className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs mb-2">Scroll to explore</span>
          <HiArrowDown className="text-xl" />
        </motion.button>
      </motion.div>
    </section>
  );
}

