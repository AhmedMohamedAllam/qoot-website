import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi';

const footerLinks = [
  { name: 'Problem', href: '#problem' },
  { name: 'Solution', href: '#solution' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'Instagram', icon: FiInstagram, href: '#' },
  { name: 'LinkedIn', icon: FiLinkedin, href: '#' },
  { name: 'Facebook', icon: FiFacebook, href: '#' },
];

export default function Footer() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2c3e50] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black tracking-tight mb-4">QOOT</h3>
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Transforming hospitality in Egypt with smart digital dining solutions. 
                Smart Menus. Smart Payments. Smarter Dining.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2ecc71] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-[#2ecc71] transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <p className="text-white/50 text-sm mb-4">Ahmed Allam, CEO</p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:ahmedallam344@gmail.com"
                    className="flex items-center space-x-3 text-white/70 hover:text-[#2ecc71] transition-colors"
                  >
                    <FiMail className="w-5 h-5" />
                    <span>ahmedallam344@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+201099441915"
                    className="flex items-center space-x-3 text-white/70 hover:text-[#2ecc71] transition-colors"
                  >
                    <FiPhone className="w-5 h-5" />
                    <span>+20 109 944 1915</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start space-x-3 text-white/70">
                    <FiMapPin className="w-5 h-5 mt-0.5" />
                    <span>New Cairo, Egypt</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Qoot. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Transforming Hospitality in Egypt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

