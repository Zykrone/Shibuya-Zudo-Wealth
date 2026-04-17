import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RolesPage from './pages/Roles';
import WhitelistPage from './pages/Whitelist';
import AbonnementsPage from './pages/Abonnements';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [page, setPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

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
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? 'app-content hidden' : 'app-content fade-in'}>
        <Navbar currentPage={page} setPage={setPage} />
        {renderPage()}
      </div>
    </>
  );
}

export default App;
