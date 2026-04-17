import React, { useState } from 'react';

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
      }, 1000);
    }, 800); // Domain Expansion flash duration
  };

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isExiting ? 'exit' : ''} ${isExpanding ? 'expanding' : ''}`} onClick={handleEnter}>
      <div className="splash-bg" />
      <div className="splash-content">
        <h1 className="splash-title">SHIBUYA ZUDO</h1>
        <p className="splash-subtitle">L'EMPIRE DE L'INFLUENCE & DE L'ÉQUILIBRE</p>
        
        <div className="enter-btn-wrap">
          <div className="enter-btn-glow" />
          <button className="enter-btn">ENTRER DANS LE DOMAINE</button>
        </div>
        
        <div className="splash-footer">
          CLIQUEZ N'IMPORTE OÙ POUR INITIALISER LE SYSTÈME AUDIO
        </div>
      </div>

      <div className="domain-expansion-ring" />
      <div className="curse-overlay" />
    </div>
  );
};

export default Splash;
