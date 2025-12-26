import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiX } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import MenuHeader from '../components/MenuHeader';
import CategoryTabs from '../components/CategoryTabs';
import MenuItem from '../components/MenuItem';
import ItemModal from '../components/ItemModal';
import { LoadingSpinner } from '../../../shared/components';

// Demo menu data for development
const demoMenu = {
  restaurant: {
    id: 'demo-restaurant',
    name: 'Cairo Grill House',
    nameAr: 'مشويات القاهرة',
    logo: null,
    description: 'Authentic Egyptian grills and cuisine',
    descriptionAr: 'مشويات مصرية أصيلة'
  },
  categories: [
    { id: 'appetizers', name: 'Appetizers', nameAr: 'المقبلات', emoji: '🥗' },
    { id: 'mains', name: 'Main Dishes', nameAr: 'الأطباق الرئيسية', emoji: '🍖' },
    { id: 'grills', name: 'Grills', nameAr: 'المشويات', emoji: '🔥' },
    { id: 'drinks', name: 'Drinks', nameAr: 'المشروبات', emoji: '🥤' },
    { id: 'desserts', name: 'Desserts', nameAr: 'الحلويات', emoji: '🍰' }
  ],
  items: [
    { id: '1', category: 'appetizers', name: 'Hummus', nameAr: 'حمص', description: 'Creamy chickpea dip with tahini and olive oil', descriptionAr: 'حمص كريمي مع طحينة وزيت زيتون', price: 45, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400', available: true },
    { id: '2', category: 'appetizers', name: 'Baba Ghanoush', nameAr: 'بابا غنوج', description: 'Smoky eggplant dip with garlic and lemon', descriptionAr: 'باذنجان مشوي مع ثوم وليمون', price: 50, image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400', available: true },
    { id: '3', category: 'appetizers', name: 'Falafel', nameAr: 'فلافل', description: 'Crispy fried chickpea patties (6 pcs)', descriptionAr: 'أقراص حمص مقلية مقرمشة (6 قطع)', price: 35, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400', available: true },
    { id: '4', category: 'appetizers', name: 'Fattoush Salad', nameAr: 'سلطة فتوش', description: 'Fresh vegetables with crispy pita and sumac dressing', descriptionAr: 'خضروات طازجة مع خبز مقرمش وصلصة السماق', price: 55, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', available: true },
    { id: '5', category: 'mains', name: 'Koshary', nameAr: 'كشري', description: 'Egyptian national dish - rice, pasta, lentils with spicy tomato sauce', descriptionAr: 'الطبق الوطني المصري - أرز ومكرونة وعدس مع صلصة طماطم حارة', price: 40, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', available: true },
    { id: '6', category: 'mains', name: 'Molokhia with Chicken', nameAr: 'ملوخية بالفراخ', description: 'Traditional Egyptian green soup with rice and chicken', descriptionAr: 'شوربة خضراء تقليدية مع أرز وفراخ', price: 85, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400', available: true },
    { id: '7', category: 'mains', name: 'Stuffed Pigeons', nameAr: 'حمام محشي', description: 'Egyptian stuffed pigeons with freekeh', descriptionAr: 'حمام مصري محشي بالفريك', price: 120, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', available: true },
    { id: '8', category: 'grills', name: 'Mixed Grill Platter', nameAr: 'مشويات مشكلة', description: 'Kebab, kofta, chicken, and lamb chops', descriptionAr: 'كباب وكفتة وفراخ وريش ضاني', price: 180, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', available: true },
    { id: '9', category: 'grills', name: 'Kofta Kebab', nameAr: 'كفتة كباب', description: 'Spiced ground beef skewers (4 pcs)', descriptionAr: 'أسياخ لحم مفروم متبل (4 قطع)', price: 95, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', available: true },
    { id: '10', category: 'grills', name: 'Grilled Chicken', nameAr: 'فراخ مشوية', description: 'Half chicken marinated in Egyptian spices', descriptionAr: 'نصف فرخة متبلة بالبهارات المصرية', price: 110, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', available: true },
    { id: '11', category: 'drinks', name: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', description: 'Fresh squeezed with mint', descriptionAr: 'ليمون طازج مع نعناع', price: 25, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400', available: true },
    { id: '12', category: 'drinks', name: 'Mango Juice', nameAr: 'عصير مانجو', description: 'Fresh Egyptian mango juice', descriptionAr: 'عصير مانجو مصري طازج', price: 30, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', available: true },
    { id: '13', category: 'drinks', name: 'Hibiscus Tea', nameAr: 'كركديه', description: 'Traditional Egyptian hibiscus tea', descriptionAr: 'شاي كركديه مصري تقليدي', price: 20, image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400', available: true },
    { id: '14', category: 'desserts', name: 'Om Ali', nameAr: 'أم علي', description: 'Traditional Egyptian bread pudding with nuts', descriptionAr: 'حلوى مصرية تقليدية مع المكسرات', price: 45, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', available: true },
    { id: '15', category: 'desserts', name: 'Konafa', nameAr: 'كنافة', description: 'Crispy pastry with cream and syrup', descriptionAr: 'عجينة مقرمشة مع كريمة وشربات', price: 50, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400', available: true },
    { id: '16', category: 'desserts', name: 'Basbousa', nameAr: 'بسبوسة', description: 'Semolina cake with coconut', descriptionAr: 'كيكة سميد مع جوز الهند', price: 35, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', available: true }
  ]
};

export default function MenuPage() {
  const { restaurantId, tableNumber } = useParams();
  const navigate = useNavigate();
  const { isRTL, language } = useLanguage();
  const { initializeCart, itemCount } = useCart();
  
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // Initialize cart with restaurant and table
    initializeCart(restaurantId, tableNumber);
    
    // Load menu data (using demo data for now)
    setTimeout(() => {
      setRestaurant(demoMenu.restaurant);
      setCategories(demoMenu.categories);
      setItems(demoMenu.items);
      setActiveCategory(demoMenu.categories[0]?.id);
      setLoading(false);
    }, 500);
  }, [restaurantId, tableNumber, initializeCart]);

  const filteredItems = items.filter(item => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery);
    return matchesCategory && matchesSearch && item.available;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text={isRTL ? 'جاري التحميل...' : 'Loading menu...'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Header */}
      <MenuHeader 
        restaurant={restaurant}
        tableNumber={tableNumber}
        isRTL={isRTL}
        language={language}
      />

      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3">
          <AnimatePresence mode="wait">
            {showSearch ? (
              <motion.div
                initial={{ opacity: 0, width: '40px' }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: '40px' }}
                className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? 'ابحث في القائمة...' : 'Search menu...'}
                  className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-[#2ecc71] focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <CategoryTabs
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelect={setActiveCategory}
                  isRTL={isRTL}
                  language={language}
                />
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full hover:bg-gray-100 ml-2"
                >
                  <FiSearch size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
              isRTL={isRTL}
              language={language}
              delay={index * 0.05}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {isRTL ? 'لا توجد عناصر' : 'No items found'}
            </p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={() => navigate('/cart')}
            className={`fixed bottom-6 ${isRTL ? 'left-4 right-4' : 'left-4 right-4'} max-w-lg mx-auto bg-[#2ecc71] text-white py-4 px-6 rounded-2xl shadow-lg shadow-[#2ecc71]/30 flex items-center justify-between z-50`}
          >
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="relative">
                <FiShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-white text-[#2ecc71] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <span className="font-bold">
                {isRTL ? 'عرض السلة' : 'View Cart'}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        isRTL={isRTL}
        language={language}
      />
    </div>
  );
}

