import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil' },
  { id: 'roles', label: 'Rôles' },
  { id: 'whitelist', label: 'Whitelist' },
  { id: 'abonnements', label: 'Abonnements' },
];

const Navbar = ({ currentPage, setPage, triggerDomainExpansion }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand jjk-heading" onClick={triggerDomainExpansion} style={{ cursor: 'pointer' }}>
        <span style={{ fontSize: '1.4rem' }}>
          SHIBUYA ZUDO
        </span>
      </div>

      <div className="navbar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => {
              setPage(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <MusicPlayer />
      </div>
    </nav>
  );
};

export default Navbar;
