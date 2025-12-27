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
    <div 
      className={`min-h-screen ${isRTL ? 'font-arabic' : 'font-body'}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0f0d0a 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu/:restaurantId/:tableNumber" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/success/:orderId" element={<SuccessPage />} />
        <Route path="/split-bill" element={<SplitPaymentPage />} />
        <Route path="/split-payment/:orderId" element={<SplitPaymentPage />} />
        <Route path="/join-bill/:restaurantId/:tableNumber" element={<SplitPaymentPage />} />
      </Routes>
      
      {/* Premium Toast Styling */}
      <Toaster
        position={isRTL ? "top-left" : "top-right"}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, rgba(26, 21, 16, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%)',
            color: '#faf8f5',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#d4af37',
              secondary: '#0a0a0a',
            },
            style: {
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }
          },
        }}
      />
    </div>
  );
}

export default App;
