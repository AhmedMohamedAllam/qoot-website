import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiToggleLeft, FiToggleRight, FiImage } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { formatCurrency } from '../../../shared/utils/currency';
import { Modal, ConfirmDialog } from '../../../shared/components';
import toast from 'react-hot-toast';

// Demo menu data
const demoCategories = [
  { id: 'appetizers', name: 'Appetizers', nameAr: 'المقبلات', emoji: '🥗' },
  { id: 'mains', name: 'Main Dishes', nameAr: 'الأطباق الرئيسية', emoji: '🍖' },
  { id: 'grills', name: 'Grills', nameAr: 'المشويات', emoji: '🔥' },
  { id: 'drinks', name: 'Drinks', nameAr: 'المشروبات', emoji: '🥤' },
  { id: 'desserts', name: 'Desserts', nameAr: 'الحلويات', emoji: '🍰' },
];

const demoItems = [
  { id: '1', category: 'appetizers', name: 'Hummus', nameAr: 'حمص', price: 45, available: true, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=200' },
  { id: '2', category: 'appetizers', name: 'Falafel', nameAr: 'فلافل', price: 35, available: true, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=200' },
  { id: '3', category: 'mains', name: 'Koshary', nameAr: 'كشري', price: 40, available: true, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: '4', category: 'grills', name: 'Mixed Grill', nameAr: 'مشويات مشكلة', price: 180, available: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200' },
  { id: '5', category: 'grills', name: 'Kofta Kebab', nameAr: 'كفتة كباب', price: 95, available: false, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200' },
  { id: '6', category: 'drinks', name: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', price: 25, available: true, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200' },
  { id: '7', category: 'desserts', name: 'Om Ali', nameAr: 'أم علي', price: 45, available: true, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200' },
];

export default function MenuPage() {
  const { isRTL, language } = useLanguage();
  const [items, setItems] = useState(demoItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    price: '',
    category: 'appetizers',
    available: true,
    description: '',
    descriptionAr: ''
  });

  const filteredItems = items.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(query) || item.nameAr.includes(query);
    }
    return true;
  });

  const handleToggleAvailability = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
    toast.success(isRTL ? 'تم تحديث التوفر' : 'Availability updated');
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.price) {
      toast.error(isRTL ? 'املأ جميع الحقول المطلوبة' : 'Fill all required fields');
      return;
    }

    if (editItem) {
      setItems(prev => prev.map(item => 
        item.id === editItem.id ? { ...item, ...formData, price: parseFloat(formData.price) } : item
      ));
      toast.success(isRTL ? 'تم تحديث العنصر' : 'Item updated');
    } else {
      const newItem = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price),
        image: null
      };
      setItems(prev => [...prev, newItem]);
      toast.success(isRTL ? 'تم إضافة العنصر' : 'Item added');
    }

    setShowAddModal(false);
    setEditItem(null);
    setFormData({ name: '', nameAr: '', price: '', category: 'appetizers', available: true, description: '', descriptionAr: '' });
  };

  const handleDelete = () => {
    setItems(prev => prev.filter(item => item.id !== deleteItem.id));
    toast.success(isRTL ? 'تم حذف العنصر' : 'Item deleted');
    setDeleteItem(null);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      nameAr: item.nameAr,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
      description: item.description || '',
      descriptionAr: item.descriptionAr || ''
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-[#2c3e50]">
            {isRTL ? 'إدارة القائمة' : 'Menu Management'}
          </h1>
          <p className="text-gray-500">
            {isRTL ? 'أضف وحرر عناصر القائمة' : 'Add and edit menu items'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditItem(null); setShowAddModal(true); }}
          className={`px-6 py-3 bg-[#2ecc71] text-white rounded-xl font-bold shadow-lg shadow-[#2ecc71]/30 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <FiPlus size={20} />
          <span>{isRTL ? 'إضافة عنصر' : 'Add Item'}</span>
        </motion.button>
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
            placeholder={isRTL ? 'بحث في القائمة...' : 'Search menu...'}
            className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none`}
          />
        </div>

        {/* Category Filter */}
        <div className={`flex gap-2 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeCategory === 'all' 
                ? 'bg-[#2ecc71] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRTL ? 'الكل' : 'All'}
          </button>
          {demoCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} ${
                activeCategory === cat.id 
                  ? 'bg-[#2ecc71] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{language === 'ar' ? cat.nameAr : cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden ${!item.available ? 'opacity-60' : ''}`}
              >
                {/* Image */}
                <div className="h-32 bg-gray-100 relative">
                  {item.image ? (
                    <img src={item.image} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiImage size={32} className="text-gray-300" />
                    </div>
                  )}
                  
                  {/* Availability Badge */}
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                        {isRTL ? 'غير متوفر' : 'Sold Out'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className="font-bold text-[#2c3e50]">{name}</h3>
                      <p className="text-[#2ecc71] font-bold mt-1">
                        {formatCurrency(item.price, language === 'ar')}
                      </p>
                    </div>
                    
                    {/* Toggle Availability */}
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`text-2xl ${item.available ? 'text-[#2ecc71]' : 'text-gray-300'}`}
                    >
                      {item.available ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-2 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 py-2 px-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                    >
                      <FiEdit2 size={14} />
                      <span>{isRTL ? 'تحرير' : 'Edit'}</span>
                    </button>
                    <button
                      onClick={() => setDeleteItem(item)}
                      className="py-2 px-3 bg-red-50 text-red-500 rounded-lg font-medium hover:bg-red-100"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditItem(null); }}
        title={editItem 
          ? (isRTL ? 'تحرير العنصر' : 'Edit Item')
          : (isRTL ? 'إضافة عنصر جديد' : 'Add New Item')
        }
        isRTL={isRTL}
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Name (English)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
                placeholder="Item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">الاسم (عربي)</label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none text-right"
                placeholder="اسم العنصر"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {isRTL ? 'السعر (ج.م)' : 'Price (EGP)'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {isRTL ? 'التصنيف' : 'Category'}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
              >
                {demoCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {language === 'ar' ? cat.nameAr : cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, available: !formData.available })}
              className={`text-3xl ${formData.available ? 'text-[#2ecc71]' : 'text-gray-300'}`}
            >
              {formData.available ? <FiToggleRight /> : <FiToggleLeft />}
            </button>
            <span className="text-gray-600">
              {isRTL ? 'متوفر' : 'Available'}
            </span>
          </div>

          <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => { setShowAddModal(false); setEditItem(null); }}
              className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
            >
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveItem}
              className="flex-1 py-3 px-4 bg-[#2ecc71] text-white rounded-xl font-bold hover:bg-[#27ae60]"
            >
              {editItem 
                ? (isRTL ? 'تحديث' : 'Update')
                : (isRTL ? 'إضافة' : 'Add')
              }
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title={isRTL ? 'حذف العنصر' : 'Delete Item'}
        message={isRTL 
          ? `هل أنت متأكد من حذف "${deleteItem?.nameAr || deleteItem?.name}"؟`
          : `Are you sure you want to delete "${deleteItem?.name}"?`
        }
        confirmText={isRTL ? 'حذف' : 'Delete'}
        cancelText={isRTL ? 'إلغاء' : 'Cancel'}
        variant="danger"
        isRTL={isRTL}
      />
    </div>
  );
}

