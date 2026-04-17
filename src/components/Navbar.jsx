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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-luxe ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand-luxe" onClick={triggerDomainExpansion}>
          <div className="brand-icon-wrap">
            <span className="brand-dot"></span>
          </div>
          <span className="brand-text">SHIBUYA <span className="text-cyan">ZUDO</span></span>
        </div>

        <div className="navbar-links-center">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-link-modern ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                setPage(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="nav-link-text">{item.label}</span>
              <div className="nav-link-indicator"></div>
            </button>
          ))}
        </div>

        <div className="navbar-actions-right">
          <MusicPlayer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
