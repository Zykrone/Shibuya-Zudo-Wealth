import React, { useState } from 'react';
import VideoBackground from './VideoBackground';

const Splash = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleEnter = () => {
    setIsExpanding(true);
    // Dispatch global event for music unmuting
    window.dispatchEvent(new CustomEvent('shibuya-enter'));
    
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1200);
    }, 800); 
  };

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isExiting ? 'exit' : ''} ${isExpanding ? 'expanding' : ''}`} onClick={handleEnter}>
      <VideoBackground videoId="lm47T73ARgI" opacity={0.6} />
      <div className="splash-bg-modern" style={{ background: 'transparent', backgroundImage: 'linear-gradient(rgba(5, 4, 10, 0.6), rgba(5, 4, 10, 0.95))' }} />
      
      <div className="splash-content" style={{ gap: '3rem' }}>
        <div className="splash-logo-container">
          <h1 className="jjk-heading" style={{ fontSize: '6rem', letterSpacing: '15px', textIndent: '15px', margin: 0, textShadow: '0 0 50px rgba(124, 58, 237, 0.5)' }}>
            SHIBUYA <span style={{ color: 'var(--cyan)' }}>CONTRIBUTION</span> ZUDO
          </h1>
          <p className="splash-subtitle" style={{ fontSize: '1.1rem', marginTop: '1.5rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '12px' }}>
            L'EMPIRE DE L'INFLUENCE & DE L'ÉQUILIBRE
          </p>
        </div>
        
        <div className="enter-btn-wrap">
          <div className="enter-btn-glow" style={{ inset: '-15px', opacity: 0.6 }} />
          <button className="enter-btn-modern" style={{ padding: '1.8rem 6rem', fontSize: '1.3rem', border: '2px solid rgba(124, 58, 237, 0.5)', borderRadius: '100px' }}>
            <span className="btn-text" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>ACCÉDER AU DOMAINE</span>
            <div className="btn-shimmer" />
          </button>
        </div>
        
        <div className="splash-footer" style={{ marginTop: '4rem', opacity: 0.5 }}>
          CLIQUEZ POUR DÉVERROUILLER L'ACCÈS
        </div>
      </div>
    </div>
  );
};

export default Splash;
