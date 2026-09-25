import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppFloating from './components/WhatsAppFloating';
import AboutPage from './pages/AboutPage';
import CompaniesPage from './pages/CompaniesPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import LegalPage from './pages/LegalPage';
import MentoringPage from './pages/MentoringPage';
import TherapyPage from './pages/TherapyPage';

export interface AppProps {
  readonly className?: string;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App({ className = '' }: Readonly<AppProps>) {
  return (
    <div className={`min-h-screen bg-canvas font-body text-umber ${className}`}>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/terapia" element={<TherapyPage />} />
        <Route path="/mentoria" element={<MentoringPage />} />
        <Route path="/empresas" element={<CompaniesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/politica-de-privacidade" element={<LegalPage type="privacy" />} />
        <Route path="/termos-de-uso" element={<LegalPage type="terms" />} />
      </Routes>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
