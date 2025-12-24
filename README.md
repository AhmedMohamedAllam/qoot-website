# 🍽️ Qoot - Smart Digital Dining Solutions

<div align="center">

![Qoot Logo](public/qoot-icon.svg)

**Transform your restaurant with smart menus, seamless ordering, and instant payments.**

[![Deploy to GitHub Pages](https://github.com/AhmedMohamedAllam/qoot-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/AhmedMohamedAllam/qoot-website/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://ahmedmohamedallam.github.io/qoot-website/) • [Request Demo](mailto:ahmedallam344@gmail.com) • [Contact Us](#contact)

</div>

---

## 🚀 About Qoot

Qoot is a complete digital dining ecosystem designed specifically for Egyptian restaurants. We help restaurant owners:

- **Increase table turnover by 20%** with faster checkout
- **Boost revenue by 15%** through smart upselling
- **Reduce labor costs by 30%** via automation

### The Qoot Ecosystem

```
SCAN → ORDER → ENJOY → PAY → ANALYZE
```

1. **Scan** - Guests scan a QR code to access your digital menu
2. **Order** - Orders go directly to kitchen with perfect accuracy
3. **Enjoy** - Guests dine without interruption
4. **Pay** - Instant table-side payment via phone
5. **Analyze** - Real-time insights on your dashboard

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📱 **Digital QR Menu** | Beautiful, dynamic menus that are easy to update |
| 🛒 **Smart Ordering** | Direct-to-kitchen orders with zero errors |
| 💳 **Table-Side Payments** | InstaPay, Fawry, Visa, Mastercard integration |
| 🔮 **AR Experience** | 3D dish visualization (Premium) |
| 📊 **Business Analytics** | Real-time performance dashboard |
| 🇪🇬 **Localized for Egypt** | Full Arabic support, local payment methods |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Backend**: Firebase Firestore
- **Email Notifications**: EmailJS
- **Internationalization**: Arabic/English with RTL support
- **Deployment**: GitHub Pages

---

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (for lead capture)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedMohamedAllam/qoot-website.git
   cd qoot-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   
   # Optional: EmailJS for email notifications
   VITE_EMAILJS_SERVICE_ID="your-service-id"
   VITE_EMAILJS_TEMPLATE_ID="your-template-id"
   VITE_EMAILJS_PUBLIC_KEY="your-public-key"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 🚀 Deployment

### GitHub Pages (Automatic)

This repository is configured with GitHub Actions for automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds the project
3. Deploys to GitHub Pages automatically

**Live URL**: https://ahmedmohamedallam.github.io/qoot-website/

### Manual Deployment

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload `dist` folder to Netlify
```

#### Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📁 Project Structure

```
qoot-website/
├── public/
│   └── qoot-icon.svg        # Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Problem.jsx      # Pain points section
│   │   ├── Solution.jsx     # 5-step workflow
│   │   ├── Features.jsx     # Feature cards
│   │   ├── ValueProposition.jsx  # ROI metrics
│   │   ├── Pricing.jsx      # Pricing tiers
│   │   ├── Roadmap.jsx      # Timeline
│   │   ├── Localization.jsx # Egypt-specific features
│   │   ├── ContactForm.jsx  # Lead capture form
│   │   └── Footer.jsx       # Footer
│   ├── firebase/
│   │   └── config.js        # Firebase configuration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment template
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json
```

---

## 🔥 Firebase Setup

### Firestore Database Structure

Create a `leads` collection with the following schema:

```javascript
{
  restaurantName: string,
  ownerName: string,
  email: string,
  phone: string,
  location: string,
  message: string,
  timestamp: Timestamp,
  status: "new" | "contacted" | "converted"
}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 📧 EmailJS Setup (Optional)

To receive email notifications when users submit the contact form:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)

2. **Add an Email Service**
   - Go to Email Services → Add New Service
   - Connect your Gmail or other email provider

3. **Create an Email Template**
   - Go to Email Templates → Create New Template
   - Use these template variables:
   ```
   Subject: New Demo Request from {{restaurant_name}}
   
   Body:
   Restaurant: {{restaurant_name}}
   Owner: {{owner_name}}
   Email: {{email}}
   Phone: {{phone}}
   Location: {{location}}
   Message: {{message}}
   ```

4. **Get your credentials**
   - Service ID: Email Services → Your Service → Service ID
   - Template ID: Email Templates → Your Template → Template ID
   - Public Key: Account → General → Public Key

5. **Add to `.env`**
   ```env
   VITE_EMAILJS_SERVICE_ID="service_xxxxx"
   VITE_EMAILJS_TEMPLATE_ID="template_xxxxx"
   VITE_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxx"
   ```

6. **Add GitHub Secrets** (for production)
   ```bash
   gh secret set VITE_EMAILJS_SERVICE_ID --body "service_xxxxx"
   gh secret set VITE_EMAILJS_TEMPLATE_ID --body "template_xxxxx"
   gh secret set VITE_EMAILJS_PUBLIC_KEY --body "xxxxxxxxxxxxx"
   ```

---

## 🌐 Internationalization

The website supports both **English** and **Arabic** with full RTL (Right-to-Left) support.

- Language toggle in the navbar
- All text content is translated
- Layout automatically adjusts for RTL
- Language preference saved to localStorage

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Ahmed Allam** - CEO

- 📧 Email: [ahmedallam344@gmail.com](mailto:ahmedallam344@gmail.com)
- 📱 WhatsApp: [+20 109 944 1915](https://wa.me/201099441915)
- 📍 Location: New Cairo, Egypt

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Egyptian Restaurants**

*Smart Menus. Smart Payments. Smarter Dining.*

</div>
