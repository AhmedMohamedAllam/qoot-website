import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiX, FiHeart, FiClock, FiStar, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useCart } from '../../../shared/contexts/CartContext';
import { formatCurrency } from '../../../shared/utils/currency';
import MenuHeader from '../components/MenuHeader';
import ItemModal from '../components/ItemModal';
import { 
  ParticleBackground, 
  FloatingCart,
  GlassCard,
  GoldButton
} from '../components/ui';

// Mood-based categories with icons
const moodCategories = [
  { id: 'all', name: 'Discover', nameAr: 'اكتشف', icon: '✨', color: '#d4af37' },
  { id: 'trending', name: 'Trending', nameAr: 'الأكثر رواجاً', icon: '🔥', color: '#ff6b35' },
  { id: 'light', name: 'Light & Fresh', nameAr: 'خفيف ومنعش', icon: '🥗', color: '#10b981' },
  { id: 'comfort', name: 'Comfort Food', nameAr: 'طعام مريح', icon: '🍖', color: '#f59e0b' },
  { id: 'quick', name: 'Quick Bites', nameAr: 'وجبات سريعة', icon: '⚡', color: '#8b5cf6' },
  { id: 'sweet', name: 'Sweet Treats', nameAr: 'حلويات', icon: '🍰', color: '#ec4899' },
];

// Demo menu data with enhanced structure
const demoMenu = {
  restaurant: {
    id: 'demo-restaurant',
    name: 'Cairo Grill House',
    nameAr: 'مشويات القاهرة',
    description: 'Authentic Egyptian grills and cuisine',
    descriptionAr: 'مشويات مصرية أصيلة'
  },
  featured: [
    { id: '8', name: 'Mixed Grill Platter', nameAr: 'مشويات مشكلة', description: 'Kebab, kofta, chicken, and lamb chops', descriptionAr: 'كباب وكفتة وفراخ وريش ضاني', price: 180, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', available: true, tags: ['trending', 'comfort'], rating: 4.9, reviews: 124 },
    { id: '7', name: 'Stuffed Pigeons', nameAr: 'حمام محشي', description: 'Egyptian stuffed pigeons with freekeh', descriptionAr: 'حمام مصري محشي بالفريك', price: 120, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', available: true, tags: ['comfort'], rating: 4.8, reviews: 89 },
    { id: '14', name: 'Om Ali', nameAr: 'أم علي', description: 'Traditional Egyptian bread pudding with nuts', descriptionAr: 'حلوى مصرية تقليدية مع المكسرات', price: 45, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800', available: true, tags: ['sweet', 'trending'], rating: 4.9, reviews: 156 },
  ],
  items: [
    { id: '1', name: 'Hummus', nameAr: 'حمص', description: 'Creamy chickpea dip with tahini and olive oil', descriptionAr: 'حمص كريمي مع طحينة وزيت زيتون', price: 45, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400', available: true, tags: ['light', 'quick'], rating: 4.7, reviews: 98 },
    { id: '2', name: 'Baba Ghanoush', nameAr: 'بابا غنوج', description: 'Smoky eggplant dip with garlic and lemon', descriptionAr: 'باذنجان مشوي مع ثوم وليمون', price: 50, image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400', available: true, tags: ['light', 'quick'], rating: 4.6, reviews: 67 },
    { id: '3', name: 'Falafel', nameAr: 'فلافل', description: 'Crispy fried chickpea patties (6 pcs)', descriptionAr: 'أقراص حمص مقلية مقرمشة (6 قطع)', price: 35, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=400', available: true, tags: ['quick', 'trending'], rating: 4.8, reviews: 145 },
    { id: '4', name: 'Fattoush Salad', nameAr: 'سلطة فتوش', description: 'Fresh vegetables with crispy pita and sumac', descriptionAr: 'خضروات طازجة مع خبز مقرمش وصلصة السماق', price: 55, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', available: true, tags: ['light'], rating: 4.5, reviews: 54 },
    { id: '5', name: 'Koshary', nameAr: 'كشري', description: 'Egyptian national dish - rice, pasta, lentils with spicy tomato sauce', descriptionAr: 'الطبق الوطني المصري - أرز ومكرونة وعدس', price: 40, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', available: true, tags: ['comfort', 'trending'], rating: 4.9, reviews: 234 },
    { id: '6', name: 'Molokhia with Chicken', nameAr: 'ملوخية بالفراخ', description: 'Traditional Egyptian green soup with rice', descriptionAr: 'شوربة خضراء تقليدية مع أرز وفراخ', price: 85, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400', available: true, tags: ['comfort'], rating: 4.7, reviews: 112 },
    { id: '8', name: 'Mixed Grill Platter', nameAr: 'مشويات مشكلة', description: 'Kebab, kofta, chicken, and lamb chops', descriptionAr: 'كباب وكفتة وفراخ وريش ضاني', price: 180, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', available: true, tags: ['trending', 'comfort'], rating: 4.9, reviews: 124 },
    { id: '9', name: 'Kofta Kebab', nameAr: 'كفتة كباب', description: 'Spiced ground beef skewers (4 pcs)', descriptionAr: 'أسياخ لحم مفروم متبل (4 قطع)', price: 95, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', available: true, tags: ['comfort'], rating: 4.6, reviews: 87 },
    { id: '10', name: 'Grilled Chicken', nameAr: 'فراخ مشوية', description: 'Half chicken marinated in Egyptian spices', descriptionAr: 'نصف فرخة متبلة بالبهارات المصرية', price: 110, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', available: true, tags: ['comfort'], rating: 4.7, reviews: 98 },
    { id: '11', name: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', description: 'Fresh squeezed with mint', descriptionAr: 'ليمون طازج مع نعناع', price: 25, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400', available: true, tags: ['light', 'quick'], rating: 4.8, reviews: 76 },
    { id: '12', name: 'Mango Juice', nameAr: 'عصير مانجو', description: 'Fresh Egyptian mango juice', descriptionAr: 'عصير مانجو مصري طازج', price: 30, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', available: true, tags: ['light', 'quick'], rating: 4.9, reviews: 89 },
    { id: '14', name: 'Om Ali', nameAr: 'أم علي', description: 'Traditional Egyptian bread pudding', descriptionAr: 'حلوى مصرية تقليدية مع المكسرات', price: 45, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', available: true, tags: ['sweet', 'trending'], rating: 4.9, reviews: 156 },
    { id: '15', name: 'Konafa', nameAr: 'كنافة', description: 'Crispy pastry with cream and syrup', descriptionAr: 'عجينة مقرمشة مع كريمة وشربات', price: 50, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400', available: true, tags: ['sweet'], rating: 4.8, reviews: 134 },
    { id: '16', name: 'Basbousa', nameAr: 'بسبوسة', description: 'Semolina cake with coconut', descriptionAr: 'كيكة سميد مع جوز الهند', price: 35, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', available: true, tags: ['sweet', 'quick'], rating: 4.7, reviews: 67 },
  ]
};

// Featured Hero Card Component
function FeaturedCard({ item, index, onClick, isRTL, language }) {
  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  
  return (
    <motion.div
      className="relative flex-shrink-0 w-[85vw] max-w-[340px] h-[420px] rounded-3xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <motion.img
        src={item.image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.9) 100%)'
        }}
      />
      
      {/* Rating Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full glass">
        <FiStar className="text-[var(--gold-primary)] fill-current" size={14} />
        <span className="text-white text-sm font-bold">{item.rating}</span>
      </div>
      
      {/* Trending Badge */}
      {item.tags?.includes('trending') && (
        <motion.div 
          className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiZap className="text-white" size={14} />
          <span className="text-white text-xs font-bold">
            {isRTL ? 'رائج' : 'HOT'}
          </span>
        </motion.div>
      )}
      
      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="text-2xl font-black text-white font-display mb-2">{name}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description}
        </p>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="price-tag text-lg">{formatCurrency(item.price, language === 'ar')}</span>
          <span className="text-white/50 text-sm">
            {item.reviews} {isRTL ? 'تقييم' : 'reviews'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Immersive Menu Item Card
function ImmersiveMenuItem({ item, onClick, isRTL, language, index }) {
  const [liked, setLiked] = useState(false);
  const name = language === 'ar' && item.nameAr ? item.nameAr : item.name;
  const description = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', damping: 20 }}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -8 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={item.image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.8) 100%)'
          }}
        />
        
        {/* Like Button */}
        <motion.button
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center glass`}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart 
            size={18} 
            className={liked ? 'text-red-500 fill-current' : 'text-white'} 
          />
        </motion.button>
        
        {/* Quick Add Button */}
        <motion.button
          className="absolute bottom-3 right-3 w-12 h-12 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)'
          }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl font-bold text-[#0a0a0a]">+</span>
        </motion.button>
        
        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg glass">
          <FiStar className="text-[var(--gold-primary)] fill-current" size={12} />
          <span className="text-white text-xs font-bold">{item.rating}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="font-bold text-[var(--text-primary)] text-lg font-display mb-1">{name}</h3>
        <p className="text-[var(--text-muted)] text-sm line-clamp-2 mb-3">{description}</p>
        
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="price-tag">{formatCurrency(item.price, language === 'ar')}</span>
          <div className={`flex items-center gap-1 text-[var(--text-dim)] text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
            <FiClock size={12} />
            <span>10-15 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mood Category Pill
function MoodPill({ category, isActive, onClick, isRTL, language }) {
  const name = language === 'ar' && category.nameAr ? category.nameAr : category.name;
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-2xl
        whitespace-nowrap font-semibold text-sm
        transition-all duration-300
        ${isRTL ? 'flex-row-reverse' : ''}
      `}
      style={{
        background: isActive 
          ? `linear-gradient(135deg, ${category.color}40 0%, ${category.color}20 100%)`
          : 'rgba(255,255,255,0.03)',
        border: isActive 
          ? `2px solid ${category.color}` 
          : '1px solid rgba(255,255,255,0.1)',
        color: isActive ? category.color : 'var(--text-secondary)',
        boxShadow: isActive ? `0 4px 20px ${category.color}30` : 'none'
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xl">{category.icon}</span>
      <span>{name}</span>
    </motion.button>
  );
}

export default function MenuPage() {
  const { restaurantId, tableNumber } = useParams();
  const { isRTL, language } = useLanguage();
  const { initializeCart } = useCart();
  const featuredRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [activeMood, setActiveMood] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    initializeCart(restaurantId, tableNumber);
    
    setTimeout(() => {
      setRestaurant(demoMenu.restaurant);
      setFeatured(demoMenu.featured);
      setItems(demoMenu.items);
      setLoading(false);
    }, 600);
  }, [restaurantId, tableNumber, initializeCart]);

  // Filter items based on mood and search
  const filteredItems = items.filter(item => {
    const matchesMood = activeMood === 'all' || item.tags?.includes(activeMood);
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr?.includes(searchQuery);
    return matchesMood && matchesSearch && item.available;
  });

  // Scroll featured carousel
  const scrollFeatured = (direction) => {
    if (featuredRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      featuredRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)' }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-32">
      <ParticleBackground count={12} />

      {/* Compact Header */}
      <motion.div 
        className="sticky top-0 z-50"
        style={{ background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(20px)' }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Restaurant Info */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                  color: '#0a0a0a'
                }}
              >
                {restaurant?.name?.charAt(0)}
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h1 className="font-bold text-[var(--text-primary)] text-lg">
                  {language === 'ar' && restaurant?.nameAr ? restaurant.nameAr : restaurant?.name}
                </h1>
                <p className="text-[var(--gold-primary)] text-sm font-medium">
                  {isRTL ? `طاولة ${tableNumber}` : `Table ${tableNumber}`}
                </p>
              </div>
            </div>
            
            {/* Search Button */}
            <motion.button
              onClick={() => setShowSearch(!showSearch)}
              className="w-11 h-11 rounded-xl flex items-center justify-center glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showSearch ? (
                <FiX className="text-[var(--gold-primary)]" size={20} />
              ) : (
                <FiSearch className="text-[var(--text-secondary)]" size={20} />
              )}
            </motion.button>
          </div>
          
          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? 'ابحث عن طبقك المفضل...' : 'Search for your favorite dish...'}
                  className="w-full mt-3 input-glass px-5 py-3 rounded-xl text-[var(--text-primary)]"
                  autoFocus
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* Featured Section */}
        <motion.section
          className="py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`px-4 mb-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-xl font-black text-[var(--text-primary)] font-display">
              {isRTL ? "✨ اختيارات الشيف" : "✨ Chef's Picks"}
            </h2>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <motion.button
                onClick={() => scrollFeatured('left')}
                className="w-9 h-9 rounded-xl flex items-center justify-center glass"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft className={`text-[var(--text-secondary)] ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
              <motion.button
                onClick={() => scrollFeatured('right')}
                className="w-9 h-9 rounded-xl flex items-center justify-center glass"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className={`text-[var(--text-secondary)] ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>
          
          {/* Horizontal Carousel */}
          <div
            ref={featuredRef}
            className={`flex gap-4 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {featured.map((item, index) => (
              <div key={item.id} className="snap-center">
                <FeaturedCard
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                  isRTL={isRTL}
                  language={language}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mood Categories */}
        <motion.section
          className="px-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`flex gap-2 overflow-x-auto scrollbar-hide pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {moodCategories.map((category) => (
              <MoodPill
                key={category.id}
                category={category}
                isActive={activeMood === category.id}
                onClick={() => setActiveMood(category.id)}
                isRTL={isRTL}
                language={language}
              />
            ))}
          </div>
        </motion.section>

        {/* Menu Grid */}
        <motion.section
          className="px-4 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <ImmersiveMenuItem
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                  isRTL={isRTL}
                  language={language}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-[var(--text-muted)] text-lg mb-4">
                {isRTL ? 'لا توجد أطباق في هذه الفئة' : 'No dishes in this category'}
              </p>
              <GoldButton onClick={() => setActiveMood('all')} size="sm">
                {isRTL ? 'عرض الكل' : 'Show All'}
              </GoldButton>
            </motion.div>
          )}
        </motion.section>
      </div>

      {/* Floating Cart */}
      <FloatingCart />

      {/* Item Modal */}
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
