import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' or 'takeaway'
  const [tip, setTip] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Tax rate (14% Egyptian VAT)
  const TAX_RATE = 0.14;

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('qoot-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setItems(parsed.items || []);
        setRestaurantId(parsed.restaurantId || null);
        setTableNumber(parsed.tableNumber || null);
        setOrderType(parsed.orderType || 'dine-in');
        setTip(parsed.tip || 0);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('qoot-cart', JSON.stringify({
      items,
      restaurantId,
      tableNumber,
      orderType,
      tip
    }));
  }, [items, restaurantId, tableNumber, orderType, tip]);

  // Initialize cart for a restaurant/table
  const initializeCart = (restId, table) => {
    // If switching restaurants, clear cart
    if (restaurantId && restaurantId !== restId) {
      setItems([]);
    }
    setRestaurantId(restId);
    setTableNumber(table);
  };

  // Add item to cart
  const addItem = (item, quantity = 1, notes = '') => {
    setItems(prev => {
      // Check if item already exists with same notes
      const existingIndex = prev.findIndex(
        i => i.id === item.id && i.notes === notes
      );

      if (existingIndex >= 0) {
        // Update quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      // Add new item
      return [...prev, { ...item, quantity, notes, cartId: Date.now() }];
    });
  };

  // Update item quantity
  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (cartId) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setTip(0);
    setSpecialInstructions('');
    localStorage.removeItem('qoot-cart');
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + tip;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Get order data for submission
  const getOrderData = () => ({
    restaurantId,
    tableNumber,
    orderType,
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      nameAr: item.nameAr,
      price: item.price,
      quantity: item.quantity,
      notes: item.notes,
      subtotal: item.price * item.quantity
    })),
    subtotal,
    tax,
    tip,
    total,
    specialInstructions,
    itemCount
  });

  const value = {
    items,
    restaurantId,
    tableNumber,
    orderType,
    tip,
    specialInstructions,
    subtotal,
    tax,
    total,
    itemCount,
    TAX_RATE,
    // Actions
    initializeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderType,
    setTip,
    setSpecialInstructions,
    getOrderData,
    // Helpers
    isEmpty: items.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

