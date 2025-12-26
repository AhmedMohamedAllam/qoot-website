import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck, FiRefreshCw, FiFilter, FiSearch, FiBell } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { formatOrderTime } from '../../../shared/utils/date';
import toast from 'react-hot-toast';

// Demo orders data
const demoOrders = [
  { 
    id: '1', 
    orderNumber: 'ORD-001', 
    tableNumber: '5', 
    status: 'new', 
    items: [
      { name: 'Mixed Grill', nameAr: 'مشويات مشكلة', quantity: 1, price: 180 },
      { name: 'Hummus', nameAr: 'حمص', quantity: 2, price: 45 }
    ],
    total: 270,
    createdAt: new Date(Date.now() - 2 * 60000),
    type: 'dine-in'
  },
  { 
    id: '2', 
    orderNumber: 'ORD-002', 
    tableNumber: '3', 
    status: 'preparing', 
    items: [
      { name: 'Koshary', nameAr: 'كشري', quantity: 2, price: 40 },
      { name: 'Lemonade', nameAr: 'ليمونادة', quantity: 2, price: 25 }
    ],
    total: 130,
    createdAt: new Date(Date.now() - 10 * 60000),
    type: 'dine-in'
  },
  { 
    id: '3', 
    orderNumber: 'ORD-003', 
    tableNumber: '7', 
    status: 'ready', 
    items: [
      { name: 'Grilled Chicken', nameAr: 'فراخ مشوية', quantity: 1, price: 110 },
      { name: 'Caesar Salad', nameAr: 'سلطة سيزر', quantity: 1, price: 55 }
    ],
    total: 165,
    createdAt: new Date(Date.now() - 20 * 60000),
    type: 'dine-in'
  },
  { 
    id: '4', 
    orderNumber: 'ORD-004', 
    tableNumber: '-', 
    status: 'new', 
    items: [
      { name: 'Falafel', nameAr: 'فلافل', quantity: 4, price: 35 },
      { name: 'Baba Ghanoush', nameAr: 'بابا غنوج', quantity: 2, price: 50 }
    ],
    total: 240,
    createdAt: new Date(Date.now() - 1 * 60000),
    type: 'takeaway'
  },
];

const statusConfig = {
  new: { 
    color: 'bg-red-500', 
    bgColor: 'bg-red-50', 
    textColor: 'text-red-600',
    label: 'New', 
    labelAr: 'جديد',
    nextStatus: 'preparing',
    nextLabel: 'Start Preparing',
    nextLabelAr: 'ابدأ التحضير'
  },
  preparing: { 
    color: 'bg-yellow-500', 
    bgColor: 'bg-yellow-50', 
    textColor: 'text-yellow-600',
    label: 'Preparing', 
    labelAr: 'قيد التحضير',
    nextStatus: 'ready',
    nextLabel: 'Mark Ready',
    nextLabelAr: 'جاهز للتقديم'
  },
  ready: { 
    color: 'bg-green-500', 
    bgColor: 'bg-green-50', 
    textColor: 'text-green-600',
    label: 'Ready', 
    labelAr: 'جاهز',
    nextStatus: 'completed',
    nextLabel: 'Complete',
    nextLabelAr: 'اكتمل'
  },
  completed: { 
    color: 'bg-gray-500', 
    bgColor: 'bg-gray-50', 
    textColor: 'text-gray-600',
    label: 'Completed', 
    labelAr: 'مكتمل',
    nextStatus: null,
    nextLabel: null,
    nextLabelAr: null
  },
};

export default function OrdersPage() {
  const { isRTL, language } = useLanguage();
  const [orders, setOrders] = useState(demoOrders);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Play sound on new order (simulated)
  useEffect(() => {
    const newOrderCount = orders.filter(o => o.status === 'new').length;
    if (newOrderCount > 0) {
      // Would play audio notification here
    }
  }, [orders]);

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return order.orderNumber.toLowerCase().includes(query) ||
             order.tableNumber.includes(query);
    }
    return true;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    const statusLabels = {
      preparing: isRTL ? 'قيد التحضير' : 'Preparing',
      ready: isRTL ? 'جاهز' : 'Ready',
      completed: isRTL ? 'مكتمل' : 'Completed'
    };
    
    toast.success(`Order ${statusLabels[newStatus]}`, { icon: '✅' });
  };

  const stats = {
    new: orders.filter(o => o.status === 'new').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'الطلبات' : 'Orders'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'إدارة طلبات العملاء في الوقت الفعلي' : 'Manage customer orders in real-time'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {Object.entries(stats).map(([status, count]) => (
            <div 
              key={status}
              className={`px-4 py-2 rounded-xl ${statusConfig[status].bgColor} ${statusConfig[status].textColor} font-medium`}
            >
              {count} {language === 'ar' ? statusConfig[status].labelAr : statusConfig[status].label}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRTL ? 'بحث عن طلب...' : 'Search orders...'}
            className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none`}
          />
        </div>

        {/* Filter Tabs */}
        <div className={`flex gap-2 bg-gray-100 p-1 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
          {['all', 'new', 'preparing', 'ready'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status 
                  ? 'bg-white shadow text-[#2c3e50]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {status === 'all' 
                ? (isRTL ? 'الكل' : 'All')
                : (language === 'ar' ? statusConfig[status].labelAr : statusConfig[status].label)
              }
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order, index) => {
            const config = statusConfig[order.status];
            
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${isRTL ? 'border-l-0 border-r-4' : ''}`}
                style={{ borderColor: config.color.replace('bg-', '').includes('red') ? '#ef4444' : 
                         config.color.includes('yellow') ? '#eab308' : 
                         config.color.includes('green') ? '#22c55e' : '#6b7280' }}
              >
                {/* Order Header */}
                <div className={`p-4 border-b border-gray-100 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="font-bold text-[#2c3e50]">{order.orderNumber}</span>
                      {order.type === 'takeaway' && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                          {isRTL ? 'استلام' : 'Takeaway'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.tableNumber !== '-' && (isRTL ? `طاولة ${order.tableNumber}` : `Table ${order.tableNumber}`)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor}`}>
                    {language === 'ar' ? config.labelAr : config.label}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => {
                      const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
                      return (
                        <div key={i} className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-gray-600">
                            {item.quantity}x {name}
                          </span>
                          <span className="text-gray-400">
                            {formatCurrency(item.price * item.quantity, language === 'ar')}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Footer */}
                  <div className={`flex items-center justify-between pt-3 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 text-gray-500 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <FiClock size={14} />
                      <span>{formatOrderTime(order.createdAt, language === 'ar')}</span>
                    </div>
                    <span className="font-bold text-[#2ecc71]">
                      {formatCurrency(order.total, language === 'ar')}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {config.nextStatus && (
                  <div className="px-4 pb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusChange(order.id, config.nextStatus)}
                      className={`w-full py-3 rounded-xl font-bold text-white ${
                        order.status === 'new' ? 'bg-yellow-500' :
                        order.status === 'preparing' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}
                    >
                      {language === 'ar' ? config.nextLabelAr : config.nextLabel}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <FiBell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            {isRTL ? 'لا توجد طلبات' : 'No orders found'}
          </p>
        </div>
      )}
    </div>
  );
}

