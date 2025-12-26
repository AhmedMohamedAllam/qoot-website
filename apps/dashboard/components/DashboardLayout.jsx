import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, FiX, FiShoppingBag, FiGrid, FiBarChart2, 
  FiSettings, FiLogOut, FiUsers, FiGlobe
} from 'react-icons/fi';
import { HiOutlineQrCode } from 'react-icons/hi2';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useAuth } from '../../../shared/contexts/AuthContext';

const navItems = [
  { path: '/orders', icon: FiShoppingBag, label: 'Orders', labelAr: 'الطلبات' },
  { path: '/menu', icon: FiGrid, label: 'Menu', labelAr: 'القائمة' },
  { path: '/analytics', icon: FiBarChart2, label: 'Analytics', labelAr: 'التحليلات' },
  { path: '/qr-codes', icon: HiOutlineQrCode, label: 'QR Codes', labelAr: 'رموز QR' },
  { path: '/team', icon: FiUsers, label: 'Team', labelAr: 'الفريق' },
  { path: '/settings', icon: FiSettings, label: 'Settings', labelAr: 'الإعدادات' },
];

export default function DashboardLayout() {
  const { isRTL, language, toggleLanguage } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : (isRTL ? '100%' : '-100%') }}
        className={`fixed lg:static inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-[#2c3e50] text-white flex flex-col lg:translate-x-0`}
        style={{ transform: 'translateX(0)' }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-[#2ecc71] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">Q</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="font-bold text-lg">Qoot</h1>
              <p className="text-xs text-white/50">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Restaurant Info (Demo) */}
        <div className="p-4 mx-4 mt-4 bg-white/10 rounded-xl">
          <p className="text-xs text-white/50">
            {isRTL ? 'المطعم' : 'Restaurant'}
          </p>
          <p className="font-bold">
            {isRTL ? 'مشويات القاهرة' : 'Cairo Grill House'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${isRTL ? 'flex-row-reverse' : ''}
                ${isActive 
                  ? 'bg-[#2ecc71] text-white shadow-lg shadow-[#2ecc71]/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">
                {language === 'ar' ? item.labelAr : item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={toggleLanguage}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <FiGlobe size={20} />
            <span>{isRTL ? 'English' : 'العربية'}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <FiLogOut size={20} />
            <span>{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className={`flex items-center justify-between px-4 lg:px-6 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Live Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 text-sm font-medium">
                {isRTL ? 'مباشر' : 'Live'}
              </span>
            </div>

            {/* User Info */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`hidden sm:block ${isRTL ? 'text-left' : 'text-right'}`}>
                <p className="text-sm font-medium text-[#2c3e50]">Ahmed Allam</p>
                <p className="text-xs text-gray-500">{isRTL ? 'المالك' : 'Owner'}</p>
              </div>
              <div className="w-10 h-10 bg-[#2ecc71] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

