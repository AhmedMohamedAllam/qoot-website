import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import SuccessPage from './pages/SuccessPage';
import SplitPaymentPage from './pages/SplitPaymentPage';

function App() {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-[#f8f9fa] ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu/:restaurantId/:tableNumber" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/success/:orderId" element={<SuccessPage />} />
        <Route path="/split-payment/:orderId" element={<SplitPaymentPage />} />
      </Routes>
      
      <Toaster
        position={isRTL ? "top-left" : "top-right"}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2c3e50',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#2ecc71',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e74c3c',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;

