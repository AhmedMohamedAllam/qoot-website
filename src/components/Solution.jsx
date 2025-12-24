import { motion } from 'framer-motion';
import { FiCamera, FiShoppingCart, FiCoffee, FiCreditCard, FiPieChart } from 'react-icons/fi';

const steps = [
  {
    number: '01',
    icon: FiCamera,
    title: 'SCAN',
    description: 'Guests scan a QR code at their table to access your digital menu instantly.',
  },
  {
    number: '02',
    icon: FiShoppingCart,
    title: 'ORDER',
    description: 'Orders are sent directly to the kitchen or bar with perfect accuracy.',
  },
  {
    number: '03',
    icon: FiCoffee,
    title: 'ENJOY',
    description: 'Guests dine without interruption while you focus on hospitality.',
  },
  {
    number: '04',
    icon: FiCreditCard,
    title: 'PAY',
    description: 'Bill is settled instantly via phone—no waiting, no hassle.',
  },
  {
    number: '05',
    icon: FiPieChart,
    title: 'ANALYZE',
    description: 'Get actionable insights on your dashboard in real-time.',
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-50">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#2ecc71]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-medium mb-4">
            The Solution
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
            The <span className="text-[#2ecc71]">Qoot</span> Ecosystem
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            Qoot is not just a digital menu. It's an all-in-one operating system for your 
            dining room that digitizes the entire customer journey from the moment they sit down.
          </p>
        </motion.div>

        {/* Steps Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2ecc71] to-transparent" />
          
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="group text-center">
                  {/* Icon Circle */}
                  <motion.div
                    className="relative mx-auto w-20 h-20 rounded-full bg-white border-4 border-[#2ecc71] shadow-lg shadow-[#2ecc71]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-8 h-8 text-[#2ecc71]" />
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2c3e50] text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#646464] leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-24 -right-2 text-[#2ecc71] text-2xl hidden lg:block">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps Timeline - Mobile/Tablet */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 w-0.5 h-full bg-[#2ecc71]/30" />
              )}

              {/* Icon Circle */}
              <div className="relative flex-shrink-0 w-20 h-20 rounded-full bg-white border-4 border-[#2ecc71] shadow-lg shadow-[#2ecc71]/20 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-[#2ecc71]" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2c3e50] text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="pt-2">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#646464] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 rounded-2xl bg-[#2c3e50] text-white text-center"
        >
          <p className="text-xl font-light mb-2">
            From seated to satisfied in
          </p>
          <p className="text-4xl font-bold text-[#2ecc71]">
            5 Simple Steps
          </p>
        </motion.div>
      </div>
    </section>
  );
}

