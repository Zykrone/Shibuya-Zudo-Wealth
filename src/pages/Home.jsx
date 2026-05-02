import React from 'react';
import { ROLES, WL_SECTIONS, SUBSCRIPTIONS } from '../data';
import RoleCard from '../components/RoleCard';
import VideoBackground from '../components/VideoBackground';

const Home = ({ setPage }) => {
  const totalRoles = ROLES.filter(r => r.price).length;
  const totalWL = WL_SECTIONS.reduce((acc, s) => acc + s.cards.length, 0);
  const featuredRoles = ROLES.filter(r => r.price && r.perm >= 6).slice(0, 3);

  return (
    <div className="page-wrapper home-page" style={{ paddingTop: 0 }}>

      {/* ── HERO CINÉMATIQUE ── */}
      <div className="home-hero">
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

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">DÉCOUVRIR</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      {/* ── RANGS DE PRESTIGE ── */}
      <div className="home-section prestige-section">
        <div className="container">
          <div className="section-header-luxe">
            <div className="section-eyebrow">Section 01 — Hiérarchie</div>
            <h2 className="section-title-luxe">
              Rangs de <span className="text-violet">Prestige</span>
            </h2>
            <p className="section-desc-luxe">
              Sélection exclusive des piliers de l'empire.
            </p>
          </div>

          <div className="featured-grid">
            {featuredRoles.map((role, i) => (
              <RoleCard key={role.id} role={role} delay={i * 0.15} />
            ))}
          </div>

          <div className="section-footer-cta">
            <button className="home-cta-btn home-cta-ghost" onClick={() => setPage('roles')}>
              Voir tous les rôles ▶
            </button>
          </div>
        </div>
      </div>

      {/* ── BIG CTA FORGEZ VOTRE LÉGENDE ── */}
      <div className="home-section ascension-section">
        <div className="container">
          <div className="ascension-card">
            <div className="ascension-orb-1" />
            <div className="ascension-orb-2" />

            <div className="section-eyebrow cyan">Section 02 — Ascension</div>

            <h2 className="ascension-title">
              Forgez votre <span className="text-cyan">Légende</span>
            </h2>
            <p className="ascension-desc">
              Ne soyez pas un simple utilisateur. Devenez un acteur majeur de Shibuya Zudo Wealth.
              Le sommet est à portée de clic.
            </p>
            <div className="hero-cta-group">
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('roles')}>Rôles</button>
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('whitelist')}>Whitelist</button>
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('abonnements')}>Abonnements</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="footer-brand">
          SHIBUYA ZUDO <span className="text-cyan">WEALTH</span>
        </div>
        <div className="footer-tagline">
          L'Équilibre Absolu. L'Autorité Suprême.
        </div>
        <div className="footer-copy">© 2025 ZUDO EMPIRE. TOUS DROITS RÉSERVÉS.</div>
      </footer>
    </div>
  );
};

export default Home;
