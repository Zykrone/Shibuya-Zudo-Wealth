import React from 'react';
import { ROLES, WL_SECTIONS, SUBSCRIPTIONS } from '../data';
import VideoBackground from '../components/VideoBackground';

const Home = ({ setPage }) => {
  const totalRoles = ROLES.filter(r => r.price).length;
  const totalWL = WL_SECTIONS.reduce((acc, s) => acc + s.cards.length, 0);

  return (
    <div className="page-wrapper home-page" style={{ paddingTop: 0, overflow: 'hidden', height: '100vh' }}>

      {/* ── HERO CINÉMATIQUE ── */}
      <div className="home-hero" style={{ height: '100vh', minHeight: '100vh' }}>
        {/* Video + overlay */}
        <div className="hero-video-container">
          <VideoBackground src={`${import.meta.env.BASE_URL}jjk_shibuya_bg.mp4`} opacity={0.6} />
          <div className="hero-vignette" />
          <div className="hero-glow-line" />
        </div>

        {/* Contenu hero */}
        <div className="container hero-content">
          {/* Badge eyebrow */}
          <div className="hero-badge">
            <span className="hero-badge-icon">⚡</span>
            L'EMPIRE DE L'INFLUENCE
          </div>

          {/* Titre principal */}
          <h1 className="hero-title-main">
            SHIBUYA ZUDO<br />
            <span className="hero-title-outline">WEALTH</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            L'apogée du prestige. Dominez avec des privilèges absolus et une autorité incontestée.
            La fusion parfaite entre technologie et influence.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('roles')}>
              <span>⚔️</span> Rôles
            </button>
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('whitelist')}>
              <span>🛡️</span> Whitelist
            </button>
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('abonnements')}>
              <span>💎</span> Abonnements
            </button>
          </div>

          {/* Stats row */}
          <div className="hero-stats-row">
            {[
              { val: totalRoles, label: 'Rôles Exclusifs' },
              { val: totalWL, label: 'Modules Whitelist' },
              { val: SUBSCRIPTIONS.length, label: 'Abonnements' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{s.val}+</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
