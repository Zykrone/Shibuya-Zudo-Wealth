import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RolesPage from './pages/Roles';
import WhitelistPage from './pages/Whitelist';
import AbonnementsPage from './pages/Abonnements';
import LoadingScreen from './components/LoadingScreen';
import CurseEnergy from './components/CurseEnergy';
import Splash from './components/Splash';
import AdminPanel from './pages/AdminPanel';
import NinjaAdmin from './components/NinjaAdmin';
import { DiscountProvider } from './context/DiscountContext';

function App() {
  const [page, setPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [isDomainExpanding, setIsDomainExpanding] = useState(false);

  const triggerDomainExpansion = () => {
    if (isDomainExpanding) return;
    setIsDomainExpanding(true);
    
    // Jouer le son
    window.dispatchEvent(new CustomEvent('shibuya-enter'));

    // Attendre que le shake (0.5s) soit fini et que l'écran soit couvert de noir
    // pour changer la page invisiblement
    setTimeout(() => {
      setPage('home');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 450);

    // Fin de l'animation
    setTimeout(() => {
      setIsDomainExpanding(false);
    }, 2800);
  };

  useEffect(() => {
    // Simulation d'un chargement initial pour laisser les assets se préparer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home setPage={setPage} />;
      case 'roles': return <RolesPage />;
      case 'whitelist': return <WhitelistPage />;
      case 'abonnements': return <AbonnementsPage />;
      case 'admin': return <AdminPanel setPage={setPage} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <DiscountProvider>
      <>
        {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
        <CurseEnergy />
        {isLoading && <LoadingScreen />}

        {isDomainExpanding && (
          <div className="shatter-overlay" style={{ zIndex: 99999 }}>
            <div className="shatter-slice-1" />
            <div className="shatter-slice-2" />
            <div className="shatter-flash" />
          </div>
        )}

        <div className={`app-content ${isLoading ? 'hidden' : ''} ${isDomainExpanding ? 'shattering-app' : ''}`}>
          <Navbar currentPage={page} setPage={setPage} triggerDomainExpansion={triggerDomainExpansion} />
          {renderPage()}
          <NinjaAdmin setPage={setPage} />
        </div>
      </>
    </DiscountProvider>
  );
}

export default App;
