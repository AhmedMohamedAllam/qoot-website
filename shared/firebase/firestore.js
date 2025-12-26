import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

// ==================== RESTAURANTS ====================

export const getRestaurant = async (restaurantId) => {
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Restaurant not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateRestaurant = async (restaurantId, data) => {
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==================== MENU ITEMS ====================

export const getMenuItems = async (restaurantId) => {
  try {
    const q = query(
      collection(db, 'menuItems'),
      where('restaurantId', '==', restaurantId),
      orderBy('category'),
      orderBy('sortOrder')
    );
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMenuItemsByCategory = async (restaurantId, category) => {
  try {
    const q = query(
      collection(db, 'menuItems'),
      where('restaurantId', '==', restaurantId),
      where('category', '==', category),
      where('available', '==', true),
      orderBy('sortOrder')
    );
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addMenuItem = async (restaurantId, itemData) => {
  try {
    const docRef = await addDoc(collection(db, 'menuItems'), {
      ...itemData,
      restaurantId,
      available: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateMenuItem = async (itemId, data) => {
  try {
    const docRef = doc(db, 'menuItems', itemId);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteMenuItem = async (itemId) => {
  try {
    const docRef = doc(db, 'menuItems', itemId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const toggleItemAvailability = async (itemId, available) => {
  try {
    const docRef = doc(db, 'menuItems', itemId);
    await updateDoc(docRef, { available, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==================== ORDERS ====================

export const createOrder = async (restaurantId, orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      restaurantId,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOrder = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Order not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOrders = async (restaurantId, filters = {}) => {
  try {
    let q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      orderBy('createdAt', 'desc')
    );
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getActiveOrders = async (restaurantId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      where('status', 'in', ['new', 'preparing', 'ready']),
      orderBy('createdAt', 'asc')
    );
    
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const updates = { 
      status, 
      updatedAt: serverTimestamp() 
    };
    
    // Add timestamp for status change
    if (status === 'preparing') {
      updates.preparingAt = serverTimestamp();
    } else if (status === 'ready') {
      updates.readyAt = serverTimestamp();
    } else if (status === 'completed') {
      updates.completedAt = serverTimestamp();
    }
    
    await updateDoc(docRef, updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrderPayment = async (orderId, paymentData) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { 
      payment: paymentData, 
      updatedAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Real-time orders listener
export const listenToOrders = (restaurantId, callback) => {
  const q = query(
    collection(db, 'orders'),
    where('restaurantId', '==', restaurantId),
    where('status', 'in', ['new', 'preparing', 'ready']),
    orderBy('createdAt', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  });
};

// Listen to single order
export const listenToOrder = (orderId, callback) => {
  const docRef = doc(db, 'orders', orderId);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    }
  });
};

// ==================== ANALYTICS ====================

export const getOrdersForAnalytics = async (restaurantId, startDate, endDate) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      where('createdAt', '<=', Timestamp.fromDate(endDate)),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getTodayOrders = async (restaurantId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return getOrdersForAnalytics(restaurantId, today, tomorrow);
};

// ==================== USERS ====================

export const getRestaurantUsers = async (restaurantId) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('restaurantId', '==', restaurantId)
    );
    
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: users };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUser = async (userId, data) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==================== CATEGORIES ====================

export const getCategories = async (restaurantId) => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('restaurantId', '==', restaurantId),
      orderBy('sortOrder')
    );
    
    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addCategory = async (restaurantId, categoryData) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      restaurantId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

