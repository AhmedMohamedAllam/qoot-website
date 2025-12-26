import { createContext, useContext, useState, useEffect } from 'react';
import { getRestaurant, updateRestaurant as updateRestaurantData } from '../firebase/firestore';
import { useAuth } from './AuthContext';

const RestaurantContext = createContext();

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const { restaurantId, isAuthenticated, loading: authLoading } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (restaurantId && isAuthenticated) {
        setLoading(true);
        const result = await getRestaurant(restaurantId);
        if (result.success) {
          setRestaurant(result.data);
        }
        setLoading(false);
      } else if (!authLoading) {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId, isAuthenticated, authLoading]);

  const updateRestaurant = async (data) => {
    if (!restaurantId) return { success: false, error: 'No restaurant ID' };
    
    const result = await updateRestaurantData(restaurantId, data);
    if (result.success) {
      setRestaurant(prev => ({ ...prev, ...data }));
    }
    return result;
  };

  const refreshRestaurant = async () => {
    if (restaurantId) {
      const result = await getRestaurant(restaurantId);
      if (result.success) {
        setRestaurant(result.data);
      }
    }
  };

  const value = {
    restaurant,
    loading,
    updateRestaurant,
    refreshRestaurant,
    // Restaurant settings
    taxRate: restaurant?.settings?.taxRate || 0.14, // 14% Egyptian VAT
    currency: restaurant?.settings?.currency || 'EGP',
    currencySymbol: restaurant?.settings?.currencySymbol || 'E£',
    tableCount: restaurant?.settings?.tableCount || 10,
    operatingHours: restaurant?.settings?.operatingHours || null
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;

