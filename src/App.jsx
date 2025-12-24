import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import SplitBill from './components/SplitBill';
import KitchenDisplay from './components/KitchenDisplay';
import Dashboard from './components/Dashboard';
import ValueProposition from './components/ValueProposition';
import InteractiveDemo from './components/InteractiveDemo';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import AdvancedFeatures from './components/AdvancedFeatures';
import Roadmap from './components/Roadmap';
import Localization from './components/Localization';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-white antialiased ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <SplitBill />
        <KitchenDisplay />
        <Dashboard />
        <ValueProposition />
        <InteractiveDemo />
        <Testimonials />
        <Pricing />
        <AdvancedFeatures />
        <Roadmap />
        <Localization />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
