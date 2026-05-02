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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar-luxe ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand-luxe" onClick={() => { triggerDomainExpansion(); setIsMobileMenuOpen(false); }}>
          <div className="brand-icon-wrap">
            <span className="brand-dot"></span>
          </div>
          <span className="brand-text">
            SHIBUYA <span className="text-cyan">ZUDO</span>
            <span className="brand-signature" style={{ 
              display: 'block', 
              fontSize: '0.6rem', 
              fontWeight: 400, 
              letterSpacing: '2px', 
              opacity: 0.5, 
              marginTop: '2px',
              color: 'var(--text-muted)'
            }}>
              fais par Zykrøne ✧
            </span>
          </span>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <div className={`navbar-links-center ${isMobileMenuOpen ? 'show' : ''}`}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-link-modern ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
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
