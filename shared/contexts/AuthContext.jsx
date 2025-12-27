import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getCurrentUserData, logout as firebaseLogout, ROLES } from '../firebase/auth';

// Demo mode flag - set to true for development without Firebase
const DEMO_MODE = true;

// Demo user data for testing
const DEMO_USER = {
  uid: 'demo-user-123',
  email: 'admin@qoot.app',
  displayName: 'Demo Admin'
};

const DEMO_USER_DATA = {
  id: 'demo-user-123',
  email: 'admin@qoot.app',
  name: 'Ahmed Mohamed',
  role: 'owner',
  restaurantId: 'demo-restaurant',
  restaurantName: 'Cairo Grill House',
  active: true
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_MODE ? DEMO_USER : null);
  const [userData, setUserData] = useState(DEMO_MODE ? DEMO_USER_DATA : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In demo mode, skip Firebase auth
    if (DEMO_MODE) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const result = await getCurrentUserData(firebaseUser.uid);
        if (result.success) {
          setUserData(result.data);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (DEMO_MODE) {
      // In demo mode, just reset state (but don't actually log out to keep demo working)
      return { success: true };
    }
    
    const result = await firebaseLogout();
    if (result.success) {
      setUser(null);
      setUserData(null);
    }
    return result;
  };

  const refreshUserData = async () => {
    if (user) {
      const result = await getCurrentUserData(user.uid);
      if (result.success) {
        setUserData(result.data);
      }
    }
  };

  const isOwner = userData?.role === ROLES.OWNER;
  const isManager = userData?.role === ROLES.MANAGER;
  const isCashier = userData?.role === ROLES.CASHIER;
  const isKitchen = userData?.role === ROLES.KITCHEN;

  const canAccessOrders = ['owner', 'manager', 'cashier', 'kitchen'].includes(userData?.role);
  const canAccessMenu = ['owner', 'manager'].includes(userData?.role);
  const canAccessAnalytics = ['owner', 'manager', 'cashier'].includes(userData?.role);
  const canAccessSettings = userData?.role === 'owner';
  const canAccessTeam = ['owner', 'manager'].includes(userData?.role);

  const value = {
    user,
    userData,
    loading,
    logout,
    refreshUserData,
    isAuthenticated: !!user,
    isOwner,
    isManager,
    isCashier,
    isKitchen,
    canAccessOrders,
    canAccessMenu,
    canAccessAnalytics,
    canAccessSettings,
    canAccessTeam,
    restaurantId: userData?.restaurantId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

