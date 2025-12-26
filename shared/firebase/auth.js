import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Sign in with email and password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user data from Firestore
export const getCurrentUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: { id: userSnap.id, ...userSnap.data() } };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Create new user (for inviting team members)
export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email,
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      active: true
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user has specific role
export const hasRole = (userData, requiredRoles) => {
  if (!userData || !userData.role) return false;
  if (typeof requiredRoles === 'string') {
    return userData.role === requiredRoles;
  }
  return requiredRoles.includes(userData.role);
};

// Role permissions
export const ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  CASHIER: 'cashier',
  KITCHEN: 'kitchen'
};

export const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: ['orders', 'menu', 'analytics', 'settings', 'team', 'all'],
  [ROLES.MANAGER]: ['orders', 'menu', 'analytics', 'team_view'],
  [ROLES.CASHIER]: ['orders', 'analytics_basic'],
  [ROLES.KITCHEN]: ['orders_kitchen']
};

export const canAccess = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission) || permissions.includes('all');
};

