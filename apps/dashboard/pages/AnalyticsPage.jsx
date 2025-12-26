import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { formatCurrency } from '../../../shared/utils/currency';

// Demo data
const revenueData = [
  { hour: '9AM', revenue: 1200 },
  { hour: '10AM', revenue: 1800 },
  { hour: '11AM', revenue: 2500 },
  { hour: '12PM', revenue: 4500 },
  { hour: '1PM', revenue: 6200 },
  { hour: '2PM', revenue: 5100 },
  { hour: '3PM', revenue: 3200 },
  { hour: '4PM', revenue: 2800 },
  { hour: '5PM', revenue: 3500 },
  { hour: '6PM', revenue: 4800 },
  { hour: '7PM', revenue: 7200 },
  { hour: '8PM', revenue: 8500 },
  { hour: '9PM', revenue: 6800 },
  { hour: '10PM', revenue: 4200 },
];

const topItems = [
  { name: 'Mixed Grill', nameAr: 'مشويات مشكلة', orders: 156, revenue: 28080 },
  { name: 'Koshary', nameAr: 'كشري', orders: 124, revenue: 4960 },
  { name: 'Grilled Chicken', nameAr: 'فراخ مشوية', orders: 98, revenue: 10780 },
  { name: 'Hummus', nameAr: 'حمص', orders: 87, revenue: 3915 },
  { name: 'Fresh Lemonade', nameAr: 'ليمونادة', orders: 76, revenue: 1900 },
];

const paymentMethods = [
  { name: 'Cash', nameAr: 'نقداً', value: 45, color: '#2ecc71' },
  { name: 'Card', nameAr: 'بطاقة', value: 30, color: '#3498db' },
  { name: 'InstaPay', nameAr: 'إنستاباي', value: 15, color: '#9b59b6' },
  { name: 'Fawry', nameAr: 'فوري', value: 10, color: '#f39c12' },
];

const weeklyData = [
  { day: 'Sat', dayAr: 'السبت', orders: 85, revenue: 12450 },
  { day: 'Sun', dayAr: 'الأحد', orders: 92, revenue: 13680 },
  { day: 'Mon', dayAr: 'الاثنين', orders: 78, revenue: 11200 },
  { day: 'Tue', dayAr: 'الثلاثاء', orders: 88, revenue: 12890 },
  { day: 'Wed', dayAr: 'الأربعاء', orders: 95, revenue: 14100 },
  { day: 'Thu', dayAr: 'الخميس', orders: 120, revenue: 18500 },
  { day: 'Fri', dayAr: 'الجمعة', orders: 145, revenue: 22300 },
];

const dateRanges = [
  { id: 'today', label: 'Today', labelAr: 'اليوم' },
  { id: 'yesterday', label: 'Yesterday', labelAr: 'أمس' },
  { id: 'week', label: 'Last 7 Days', labelAr: 'آخر 7 أيام' },
  { id: 'month', label: 'Last 30 Days', labelAr: 'آخر 30 يوم' },
];

export default function AnalyticsPage() {
  const { isRTL, language } = useLanguage();
  const [dateRange, setDateRange] = useState('today');

  const stats = [
    { 
      label: 'Today\'s Revenue', 
      labelAr: 'إيرادات اليوم', 
      value: 62480, 
      trend: '+23%', 
      icon: FiDollarSign, 
      color: '#2ecc71' 
    },
    { 
      label: 'Total Orders', 
      labelAr: 'إجمالي الطلبات', 
      value: 156, 
      trend: '+18%', 
      icon: FiShoppingBag, 
      color: '#3498db' 
    },
    { 
      label: 'Customers', 
      labelAr: 'العملاء', 
      value: 89, 
      trend: '+12%', 
      icon: FiUsers, 
      color: '#9b59b6' 
    },
    { 
      label: 'Avg. Order Value', 
      labelAr: 'متوسط الطلب', 
      value: 145, 
      trend: '+8%', 
      icon: FiTrendingUp, 
      color: '#f39c12' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'التحليلات' : 'Analytics'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'تتبع أداء مطعمك' : 'Track your restaurant performance'}
          </p>
        </div>

        {/* Date Range Selector */}
        <div className={`flex gap-2 bg-white p-1 rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
          {dateRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                dateRange === range.id 
                  ? 'bg-[#2ecc71] text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {language === 'ar' ? range.labelAr : range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <p className={`text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? stat.labelAr : stat.label}
            </p>
            <p className={`text-2xl font-black mt-1 ${isRTL ? 'text-right' : ''}`} style={{ color: stat.color }}>
              {stat.label.includes('Revenue') || stat.label.includes('Order Value')
                ? formatCurrency(stat.value, language === 'ar')
                : stat.value.toLocaleString()
              }
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className={`font-bold text-[#2c3e50] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? '📊 المبيعات بالساعة' : '📊 Hourly Sales'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value, language === 'ar'), isRTL ? 'الإيرادات' : 'Revenue']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="revenue" fill="#2ecc71" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Payment Methods Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className={`font-bold text-[#2c3e50] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? '💳 طرق الدفع' : '💳 Payment Methods'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentMethods}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={`flex flex-wrap gap-3 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {paymentMethods.map((method) => (
              <div key={method.name} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                <span className="text-xs text-gray-600">
                  {language === 'ar' ? method.nameAr : method.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Items & Weekly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className={`font-bold text-[#2c3e50] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? '🏆 الأكثر مبيعاً' : '🏆 Top Selling Items'}
          </h3>
          <div className="space-y-4">
            {topItems.map((item, index) => {
              const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
              const maxRevenue = Math.max(...topItems.map(i => i.revenue));
              const percentage = (item.revenue / maxRevenue) * 100;
              
              return (
                <div key={item.name}>
                  <div className={`flex items-center justify-between mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                        {index + 1}
                      </span>
                      <span className="font-medium text-[#2c3e50]">{name}</span>
                    </div>
                    <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                      <span className="font-bold text-[#2ecc71]">
                        {formatCurrency(item.revenue, language === 'ar')}
                      </span>
                      <span className="text-xs text-gray-400 block">
                        {item.orders} {isRTL ? 'طلب' : 'orders'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className={`font-bold text-[#2c3e50] mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? '📈 أداء الأسبوع' : '📈 Weekly Performance'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={language === 'ar' ? 'dayAr' : 'day'} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="orders" 
                name={isRTL ? 'الطلبات' : 'Orders'}
                stroke="#3498db" 
                strokeWidth={3}
                dot={{ fill: '#3498db', strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                name={isRTL ? 'الإيرادات' : 'Revenue'}
                stroke="#2ecc71" 
                strokeWidth={3}
                dot={{ fill: '#2ecc71', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

