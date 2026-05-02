import React, { useState, useEffect, useRef } from 'react';
import VideoBackground from './VideoBackground';

const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 6 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 1.5 + 0.5,
      isCyan: Math.random() > 0.5
    }));
    setParticles(p);
  }, []);

  return (
    <div className="splash-particles">
      {particles.map(p => (
        <div 
          key={p.id} 
          className={`splash-particle ${p.isCyan ? 'cyan' : 'violet'}`}
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
            transform: `scale(${p.scale})`
          }}
        />
      ))}
    </div>
  );
};

const Splash = ({ onEnter }) => {
  const [isShattering, setIsShattering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isShattering) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30; // parallax factor
      const y = (clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isShattering]);

  const handleEnter = () => {
    if (isShattering) return;
    setIsShattering(true);
    
    // Activer l'audio
    window.dispatchEvent(new CustomEvent('shibuya-enter'));
    
    // Attendre la fin de l'animation de déchirure (shatter)
    setTimeout(() => {
      setIsVisible(false);
      if (onEnter) onEnter();
    }, 2800);
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className={`splash-screen-luxe ${isShattering ? 'shattering' : ''}`}
    >
      <div 
        className="parallax-layer parallax-bg"
        style={{ transform: `scale(1.1) translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
      >
        <VideoBackground src={`${import.meta.env.BASE_URL}jjk_shibuya_bg.mp4`} opacity={0.6} />
        <div className="splash-bg-overlay" />
      </div>

      <Particles />

      <div 
        className="splash-content-luxe"
        style={{ transform: `translate(${mousePos.x * 1}px, ${mousePos.y * 1}px)` }}
      >
        <div className="splash-logo-wrap">
          <h1 className="splash-title-ultra">
            <span className="glitch-wrapper" data-text="SHIBUYA">SHIBUYA</span>
            <span className="text-cyan text-glow"> CONTRIBUTION </span>
            <span className="glitch-wrapper" data-text="ZUDO">ZUDO</span>
          </h1>
          <p className="splash-subtitle-glitch">
            L'EMPIRE DE L'INFLUENCE & DE L'ÉQUILIBRE
          </p>
        </div>
        
        <div className="enter-btn-wrap-luxe" onClick={handleEnter}>
          <div className="enter-btn-aura" />
          <button className="enter-btn-epic">
            <span className="btn-epic-text">ACCÉDER AU DOMAINE</span>
            <div className="btn-epic-slash" />
          </button>
        </div>
      </div>

      {isShattering && (
        <div className="shatter-overlay">
          <div className="shatter-slice-1" />
          <div className="shatter-slice-2" />
          <div className="shatter-flash" />
        </div>
      )}
    </div>
  );
};

export default Splash;
