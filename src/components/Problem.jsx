import { motion } from 'framer-motion';
import { FiUsers, FiClock, FiFileText, FiBarChart2 } from 'react-icons/fi';

const painPoints = [
  {
    icon: FiUsers,
    title: 'Overwhelmed Staff',
    description: 'Staff are overwhelmed during peak hours, leading to service errors and unhappy customers.',
  },
  {
    icon: FiClock,
    title: 'Slow Table Turnover',
    description: 'Guests wait too long for the bill, reducing your daily covers and revenue potential.',
  },
  {
    icon: FiFileText,
    title: 'Expensive Menu Updates',
    description: 'Reprinting paper menus every time prices change drains your budget unnecessarily.',
  },
  {
    icon: FiBarChart2,
    title: 'No Real Data',
    description: 'You lack real data on what is actually selling, making decisions based on guesswork.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-[#1a252f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            The Challenge
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Chaos of <span className="text-red-400">Traditional Dining</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Running a restaurant in Egypt today involves juggling overwhelmed staff, 
            outdated paper menus, and payment bottlenecks. These friction points 
            don't just annoy customers—they cost you money.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <point.icon className="w-7 h-7 text-red-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {point.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {point.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500/50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-lg mb-6">
            Sound familiar? There's a better way.
          </p>
          <motion.button
            onClick={() => {
              const element = document.querySelector('#solution');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#2ecc71]/10 text-[#2ecc71] font-medium hover:bg-[#2ecc71]/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See the Solution
            <span className="ml-2">↓</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

