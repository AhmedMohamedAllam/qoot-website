import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiZap } from 'react-icons/fi';

const pricingPlans = [
  {
    name: 'STARTER',
    subtitle: 'Menu Only',
    description: 'Perfect for cafes needing quick digital menus.',
    price: 'Contact Us',
    period: '',
    features: [
      'QR Code generation',
      'Digital Menu Management',
      'Basic customization',
      'Up to 50 menu items',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'PRO',
    subtitle: 'Full Suite',
    description: 'Best for busy restaurants with high volume.',
    price: 'Contact Us',
    period: '',
    features: [
      'Everything in Starter',
      'Smart Ordering System',
      'Table-Side Payments',
      'Basic Analytics Dashboard',
      'Unlimited menu items',
      'Priority support',
      'Staff training included',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'ENTERPRISE',
    subtitle: 'Premium Experience',
    description: 'For chains and luxury dining establishments.',
    price: 'Custom',
    period: '',
    features: [
      'Everything in Pro',
      'AR Menu Visualization',
      'AI Recommendations',
      'API Access',
      'Advanced Analytics',
      'Multi-location support',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly] = useState(false);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 right-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl" />
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
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
            Flexible SaaS for <span className="text-[#2ecc71]">Every Stage</span>
          </h2>
          <p className="text-lg text-[#646464] max-w-3xl mx-auto">
            Choose the plan that fits your restaurant's needs. 
            All plans include our core digital dining technology.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular 
                  ? 'bg-[#2c3e50] text-white' 
                  : 'bg-white border border-gray-100'
              } p-8 shadow-lg`}
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-[#2ecc71] rounded-full text-white text-sm font-bold flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-1 ${
                  plan.popular ? 'text-white' : 'text-[#2c3e50]'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  plan.popular ? 'text-white/60' : 'text-[#646464]'
                }`}>
                  {plan.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className={`text-4xl font-black ${
                  plan.popular ? 'text-[#2ecc71]' : 'text-[#2c3e50]'
                }`}>
                  {plan.price}
                </div>
                {plan.period && (
                  <div className={`text-sm ${
                    plan.popular ? 'text-white/60' : 'text-[#646464]'
                  }`}>
                    {plan.period}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className={`text-center text-sm mb-8 ${
                plan.popular ? 'text-white/70' : 'text-[#646464]'
              }`}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-[#2ecc71]/20' : 'bg-[#2ecc71]/10'
                    }`}>
                      <FiCheck className="w-3 h-3 text-[#2ecc71]" />
                    </div>
                    <span className={`text-sm ${
                      plan.popular ? 'text-white/80' : 'text-[#646464]'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  plan.popular
                    ? 'bg-[#2ecc71] text-white hover:bg-[#27ae60]'
                    : 'bg-[#2c3e50] text-white hover:bg-[#34495e]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[#646464]">
            Need a custom solution?{' '}
            <button 
              onClick={scrollToContact}
              className="text-[#2ecc71] font-semibold hover:underline"
            >
              Contact us for enterprise pricing
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

