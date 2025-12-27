import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from '../../shared/contexts/LanguageContext';
import { CartProvider } from '../../shared/contexts/CartContext';
import './index.css';

// Set basename for GitHub Pages deployment, empty for local development
const basename = import.meta.env.PROD ? '/qoot-website/customer' : '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
