import { motion } from 'framer-motion';
import { FiMapPin, FiPackage, FiCpu, FiSun } from 'react-icons/fi';

const milestones = [
  {
    quarter: 'Q1',
    icon: FiMapPin,
    title: 'MVP Launch',
    description: 'Launch in New Cairo & Madinaty with core features',
    status: 'current',
    locations: ['New Cairo', 'Madinaty'],
  },
  {
    quarter: 'Q2',
    icon: FiPackage,
    title: 'Inventory Integration',
    description: 'Advanced inventory management and supplier connections',
    status: 'upcoming',
    locations: [],
  },
  {
    quarter: 'Q3',
    icon: FiCpu,
    title: 'AI Personalization',
    description: 'AI-driven customer personalization and recommendations',
    status: 'upcoming',
    locations: [],
  },
  {
    quarter: 'Q4',
    icon: FiSun,
    title: 'Coastal Expansion',
    description: 'Expansion to premium vacation destinations',
    status: 'upcoming',
    locations: ['Sahel', 'Gouna'],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-medium mb-4">
            Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
            Building for the <span className="text-[#2ecc71]">Future</span>
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            Our vision extends beyond New Cairo. Here's how we're planning to 
            revolutionize dining across Egypt.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2ecc71] via-[#3498db] to-[#9b59b6]" />

            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      milestone.status === 'current'
                        ? 'bg-[#2ecc71] shadow-lg shadow-[#2ecc71]/30'
                        : 'bg-white border-4 border-[#2ecc71]/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <milestone.icon 
                      className={`w-6 h-6 ${
                        milestone.status === 'current' ? 'text-white' : 'text-[#2ecc71]'
                      }`} 
                    />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div 
                  className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-20' : 'md:pl-20'
                  }`}
                >
                  <motion.div
                    className={`p-6 rounded-2xl ${
                      milestone.status === 'current'
                        ? 'bg-[#2ecc71] text-white'
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  >
                    {/* Quarter Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${
                      milestone.status === 'current'
                        ? 'bg-white/20 text-white'
                        : 'bg-[#2ecc71]/10 text-[#2ecc71]'
                    }`}>
                      {milestone.quarter} 2025
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-2 ${
                      milestone.status === 'current' ? 'text-white' : 'text-[#2c3e50]'
                    }`}>
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm mb-4 ${
                      milestone.status === 'current' ? 'text-white/80' : 'text-[#646464]'
                    }`}>
                      {milestone.description}
                    </p>

                    {/* Locations */}
                    {milestone.locations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {milestone.locations.map((location, locIndex) => (
                          <span
                            key={locIndex}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              milestone.status === 'current'
                                ? 'bg-white/20 text-white'
                                : 'bg-[#2c3e50]/10 text-[#2c3e50]'
                            }`}
                          >
                            <FiMapPin className="inline w-3 h-3 mr-1" />
                            {location}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Current Status Indicator */}
                    {milestone.status === 'current' && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs text-white/80">Currently Active</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-[#646464] text-lg mb-6">
            Be part of the dining revolution from day one.
          </p>
          <motion.button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#2ecc71] text-white rounded-xl font-semibold shadow-lg shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Early Adopter Program
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

