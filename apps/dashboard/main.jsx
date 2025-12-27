import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from '../../shared/contexts/LanguageContext';
import { AuthProvider } from '../../shared/contexts/AuthContext';
import { RestaurantProvider } from '../../shared/contexts/RestaurantContext';
import './index.css';

// Set basename for GitHub Pages deployment, empty for local development
const basename = import.meta.env.PROD ? '/qoot-website/dashboard' : '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <AuthProvider>
          <RestaurantProvider>
            <App />
          </RestaurantProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
