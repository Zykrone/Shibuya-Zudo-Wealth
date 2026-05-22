import React from 'react';
import { ROLES, WL_SECTIONS, SUBSCRIPTIONS } from '../data';
import VideoBackground from '../components/VideoBackground';
import CursedEnergyBackground from '../components/CursedEnergyBackground';
import GradeVisualizer from '../components/GradeVisualizer';

const Home = ({ setPage }) => {
  const totalRoles = ROLES.filter(r => r.price).length;
  const totalWL = WL_SECTIONS.reduce((acc, s) => acc + s.cards.length, 0);

  return (
    <div className="page-wrapper home-page" style={{ paddingTop: 0, minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      {/* ── BACKGROUND PARTICULES MAUDITES INTERACTIVES ── */}
      <CursedEnergyBackground />

      {/* ── HERO CINÉMATIQUE ── */}
      <div className="home-hero" style={{ height: '100vh', minHeight: '100vh', position: 'relative' }}>
        {/* Video + overlay */}
        <div className="hero-video-container">
          <VideoBackground src={`${import.meta.env.BASE_URL}jjk_shibuya_bg.mp4`} opacity={0.6} />
          <div className="hero-vignette" />
          <div className="hero-glow-line" />
        </div>

        {/* Contenu hero */}
        <div className="container hero-content" style={{ zIndex: 5 }}>
          {/* Titre principal */}
          <h1 className="hero-title-main" style={{ textShadow: '0 0 40px rgba(124, 58, 237, 0.4), 0 10px 40px rgba(0,0,0,0.8)' }}>
            SHIBUYA ZUDO<br />
            <span className="hero-title-outline">WEALTH</span>
          </h1>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button className="home-cta-btn btn-jjk btn-jjk-roles" onClick={() => { setPage('roles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="btn-icon">⚔️</span> Rôles
            </button>
            <button className="home-cta-btn btn-jjk btn-jjk-wl" onClick={() => { setPage('whitelist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="btn-icon">🛡️</span> Whitelist
            </button>
            <button className="home-cta-btn btn-jjk btn-jjk-subs" onClick={() => { setPage('abonnements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="btn-icon">💎</span> Abonnements
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator" 
          onClick={() => {
            const showcase = document.getElementById('domain-showcase');
            if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
          }} 
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <span className="scroll-text">Scroller</span>
          <span className="scroll-arrow">▼</span>
        </div>
      </div>

      {/* ── SECTION 1: L'EXTENSION DU DOMAINE (VISUALISATEUR DE GRADES) ── */}
      <section id="domain-showcase" className="home-section container" style={{ position: 'relative', zIndex: 10, padding: '8rem 1.5rem' }}>
        <div className="section-header-luxe">
          <span className="section-eyebrow">⛩️ LE DOMAINE</span>
          <h2 className="section-title-luxe">L'Extension du Domaine</h2>
          <p className="section-desc-luxe">
            Visualisez et canalisez la hiérarchie occulte des rôles prestigieux de Shibuya.
          </p>
        </div>
        
        <GradeVisualizer setPage={setPage} />
      </section>

      {/* ── SECTION 2: LES PRIVILÈGES DE SHIBUYA (MODULES WHITELIST HOLOGRAPHIQUES) ── */}
      <section className="home-section container" style={{ position: 'relative', zIndex: 10, padding: '6rem 1.5rem' }}>
        <div className="section-header-luxe">
          <span className="section-eyebrow cyan">🛡️ PRIVILÈGES</span>
          <h2 className="section-title-luxe">Modules de Whitelist</h2>
          <p className="section-desc-luxe">
            Des outils d'action suprêmes et de contrôle vocal conçus pour asseoir votre autorité.
          </p>
        </div>

        <div className="featured-grid">
          {[
            {
              title: 'OWNER FABULOUS',
              icon: '✨',
              price: '125 €',
              desc: "Pack d'action exclusif incluant le contrôle de pseudos et le réveil forcé de cibles.",
              features: [
                '/dog-add - met la cible en laisse vocalement',
                '/wakeup - réveil + spam MP prioritaire',
                '/tipeu - rename en Z et verrouillage de pseudo',
              ]
            },
            {
              title: 'OWNER VOICEMASTER',
              icon: '🎙️',
              price: '200 €',
              desc: 'Privatisez vos vocaux, gérez les accès et déplacez vos alliés d\'un simple clic.',
              features: [
                '=pv - rend un salon vocal privé instantanément',
                '=acces - donne l\'accès exclusif à un membre',
                '=join - rejoint certains salons en bypassant la modération',
              ]
            },
            {
              title: '🔨 - SYS JUGE',
              icon: '⚖️',
              price: '600 €',
              desc: 'Accès à la justice suprême du serveur et protection immunitaire absolue.',
              features: [
                '+unbanall - clear la liste des bannis du serveur',
                'Vous devenez protect-user (immunité complète)',
                'Statut de Juge Infaillible avec décision souveraine',
              ]
            }
          ].map((wl, idx) => (
            <div key={idx} className="holographic-card">
              <div className="holographic-glow-point" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{wl.icon}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 950, color: 'var(--cyan-light)', fontFamily: 'var(--font-heading)' }}>{wl.price}</div>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                {wl.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.8rem', minHeight: '48px', lineHeight: '1.5' }}>
                {wl.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {wl.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--cyan)' }}>✦</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer-cta">
          <button className="home-cta-btn btn-jjk btn-jjk-wl" onClick={() => { setPage('whitelist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="btn-icon">🛡️</span> Découvrir toute la Whitelist
          </button>
        </div>
      </section>

      {/* ── SECTION 3: L'ASCENSION ULTIME (CALL TO ACTION) ── */}
      <section className="home-section container" style={{ position: 'relative', zIndex: 10, padding: '4rem 1.5rem 6rem' }}>
        <div className="ascension-card">
          <div className="ascension-orb-1" />
          <div className="ascension-orb-2" />
          <h2 className="ascension-title">Prenez le Contrôle Absolu</h2>
          <p className="ascension-desc">
            Le domaine de Shibuya n'attend que votre signature. Choisissez votre ascension et régnez aux côtés des fondateurs dès aujourd'hui.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="home-cta-btn btn-jjk btn-jjk-roles" style={{ margin: 0 }} onClick={() => { setPage('roles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="btn-icon">⚔️</span> Rôles Occultes
            </button>
            <button className="home-cta-btn btn-jjk btn-jjk-subs" style={{ margin: 0 }} onClick={() => { setPage('abonnements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="btn-icon">💎</span> Abonnements
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER NÉON PREMIUM ── */}
      <footer className="home-footer">
        <div className="footer-links-grid">
          <div>
            <div className="footer-brand">SHIBUYA ZUDO</div>
            <div className="footer-tagline">L'EMPIRE DE L'INFLUENCE</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '350px', lineHeight: '1.6', marginTop: '1rem' }}>
              La fusion parfaite entre technologie occulte, prestige et privilèges. Rejoignez le domaine suprême et régnez en maître.
            </p>
          </div>
          <div className="footer-nav-col">
            <h4>Domaine</h4>
            <ul className="footer-nav-links">
              <li>
                <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Accueil</button>
              </li>
              <li>
                <button onClick={() => { setPage('roles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Rôles</button>
              </li>
              <li>
                <button onClick={() => { setPage('whitelist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Whitelist</button>
              </li>
            </ul>
          </div>
          <div className="footer-nav-col">
            <h4>Privilèges</h4>
            <ul className="footer-nav-links">
              <li>
                <button onClick={() => { setPage('abonnements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Abonnements</button>
              </li>
              <li>
                <button onClick={() => { setPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Panel Privé</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-divider-glow" />
        <div className="footer-copy">
          PRODUIT SIMULÉ POUR SHIBUYA INCIDENT // CONÇU PAR ZYKRØNE ✧ COPYRIGHT © {new Date().getFullYear()} // TOUS DROITS RÉSERVÉS
        </div>
      </footer>

    </div>
  );
};

export default Home;
