import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiImage, FiMapPin, FiClock, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { isRTL, language, toggleLanguage } = useLanguage();
  
  const [settings, setSettings] = useState({
    name: 'Cairo Grill House',
    nameAr: 'مشويات القاهرة',
    description: 'Authentic Egyptian grills and cuisine',
    descriptionAr: 'مشويات مصرية أصيلة',
    phone: '+20 123 456 7890',
    address: 'New Cairo, Egypt',
    addressAr: 'القاهرة الجديدة، مصر',
    email: 'info@cairogrill.com',
    taxRate: 14,
    tableCount: 10,
    currency: 'EGP',
    openTime: '10:00',
    closeTime: '23:00',
    subscriptionPlan: 'Pro',
    subscriptionExpiry: '2025-12-31'
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(isRTL ? 'تم حفظ الإعدادات' : 'Settings saved');
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'الإعدادات' : 'Settings'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'إدارة إعدادات المطعم' : 'Manage restaurant settings'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-3 bg-[#2ecc71] text-white rounded-xl font-bold shadow-lg shadow-[#2ecc71]/30 flex items-center gap-2 disabled:opacity-50 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <FiSave size={20} />
          )}
          <span>{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</span>
        </motion.button>
      </div>

      {/* Restaurant Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h2 className={`text-lg font-bold text-[#2c3e50] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FiImage size={20} />
          {isRTL ? 'معلومات المطعم' : 'Restaurant Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الاسم (إنجليزي)' : 'Name (English)'}
            </label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الاسم (عربي)' : 'Name (Arabic)'}
            </label>
            <input
              type="text"
              value={settings.nameAr}
              onChange={(e) => setSettings({ ...settings, nameAr: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none text-right"
              dir="rtl"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'الهاتف' : 'Phone'}
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Location & Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h2 className={`text-lg font-bold text-[#2c3e50] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FiMapPin size={20} />
          {isRTL ? 'الموقع وساعات العمل' : 'Location & Hours'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'العنوان (إنجليزي)' : 'Address (English)'}
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'العنوان (عربي)' : 'Address (Arabic)'}
            </label>
            <input
              type="text"
              value={settings.addressAr}
              onChange={(e) => setSettings({ ...settings, addressAr: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none text-right"
              dir="rtl"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              <FiClock className="inline mr-1" size={14} />
              {isRTL ? 'وقت الفتح' : 'Opening Time'}
            </label>
            <input
              type="time"
              value={settings.openTime}
              onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              <FiClock className="inline mr-1" size={14} />
              {isRTL ? 'وقت الإغلاق' : 'Closing Time'}
            </label>
            <input
              type="time"
              value={settings.closeTime}
              onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Business Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h2 className={`text-lg font-bold text-[#2c3e50] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FiDollarSign size={20} />
          {isRTL ? 'إعدادات العمل' : 'Business Settings'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'نسبة الضريبة (%)' : 'Tax Rate (%)'}
            </label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'عدد الطاولات' : 'Table Count'}
            </label>
            <input
              type="number"
              value={settings.tableCount}
              onChange={(e) => setSettings({ ...settings, tableCount: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-gray-600 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {isRTL ? 'العملة' : 'Currency'}
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
            >
              <option value="EGP">EGP - Egyptian Pound</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Language Preference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h2 className={`text-lg font-bold text-[#2c3e50] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FiGlobe size={20} />
          {isRTL ? 'تفضيلات اللغة' : 'Language Preferences'}
        </h2>

        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => !isRTL && toggleLanguage()}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              !isRTL 
                ? 'bg-[#2ecc71] text-white' 
                : 'border-2 border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => isRTL && toggleLanguage()}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              isRTL 
                ? 'bg-[#2ecc71] text-white' 
                : 'border-2 border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            🇪🇬 العربية
          </button>
        </div>
      </motion.div>

      {/* Subscription Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] rounded-2xl p-6 text-white"
      >
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-white/60 text-sm">
              {isRTL ? 'خطة الاشتراك الحالية' : 'Current Subscription'}
            </p>
            <h3 className="text-2xl font-black mt-1">
              {settings.subscriptionPlan} Plan
            </h3>
            <p className="text-white/60 text-sm mt-2">
              {isRTL ? 'ينتهي في' : 'Expires on'}: {settings.subscriptionExpiry}
            </p>
          </div>
          <div className="w-16 h-16 bg-[#2ecc71] rounded-2xl flex items-center justify-center">
            <span className="text-3xl">⚡</span>
          </div>
        </div>
        
        <button className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors">
          {isRTL ? 'ترقية الخطة' : 'Upgrade Plan'}
        </button>
      </motion.div>
    </div>
  );
}

