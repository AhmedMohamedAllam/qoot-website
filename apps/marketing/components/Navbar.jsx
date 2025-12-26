import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdLanguage } from 'react-icons/md';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage, isRTL } = useLanguage();

  const navLinks = [
    { name: t('nav.problem'), href: '#problem' },
    { name: t('nav.solution'), href: '#solution' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.pricing'), href: '#pricing' },
    { name: t('nav.roadmap'), href: '#roadmap' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ left: 0, right: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 md:h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <motion.a
              href="#"
              className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${
                isScrolled ? 'text-[#2c3e50]' : 'text-white'
              }`}>
                {isRTL ? 'قوت' : 'QOOT'}
              </span>
              <span className={`hidden sm:inline-block text-xs font-medium px-2 py-1 rounded-full ${
                isScrolled 
                  ? 'bg-[#2ecc71]/10 text-[#2ecc71]' 
                  : 'bg-white/20 text-white'
              }`}>
                {isRTL ? 'تجربة طعام رقمية' : 'Digital Dining'}
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-[#2c3e50] hover:bg-[#2ecc71]/10 hover:text-[#2ecc71]'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.button>
              ))}
              
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-[#2c3e50] hover:bg-[#2ecc71]/10 hover:text-[#2ecc71]'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <MdLanguage size={18} />
                <span>{language === 'en' ? 'عربي' : 'EN'}</span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('#contact')}
                className={`${isRTL ? 'mr-4' : 'ml-4'} px-6 py-2.5 bg-[#2ecc71] text-white rounded-lg font-semibold text-sm shadow-lg shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-colors`}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(46, 204, 113, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.requestDemo')}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled ? 'text-[#2c3e50]' : 'text-white'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-72 bg-white shadow-2xl`}
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
            >
              <div className="p-6 pt-20">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-3 rounded-lg text-[#2c3e50] font-medium hover:bg-[#2ecc71]/10 hover:text-[#2ecc71] transition-colors`}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                  
                  {/* Language Toggle Mobile */}
                  <motion.button
                    onClick={toggleLanguage}
                    className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-3 rounded-lg text-[#2c3e50] font-medium hover:bg-[#2ecc71]/10 hover:text-[#2ecc71] transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <MdLanguage size={20} />
                    <span>{language === 'en' ? 'العربية' : 'English'}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full mt-4 px-4 py-3 bg-[#2ecc71] text-white rounded-lg font-semibold shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {t('nav.requestDemo')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
