import React from 'react';
import { ROLES, WL_SECTIONS, SUBSCRIPTIONS } from '../data';
import RoleCard from '../components/RoleCard';

const Home = ({ setPage }) => {
  const totalRoles = ROLES.filter(r => r.price).length;
  const totalWL = WL_SECTIONS.reduce((acc, s) => acc + s.cards.length, 0);

  const featuredRoles = ROLES.filter(r => r.price && r.perm >= 6).slice(0, 3);

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      {/* CINEMATIC HERO */}
      <div className="hero-wrapper" style={{ 
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', textAlign: 'center'
      }}>
        {/* Animated Background Elements */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <div className="page-bg" />
          <div style={{ 
            position: 'absolute', inset: 0, 
            background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            animation: 'float 8s infinite ease-in-out'
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-eyebrow" style={{ animationDelay: '0.2s' }}>
            <span>⚡</span> L'EMPIRE DE L'INFLUENCE
          </div>
          <h1 style={{ 
            fontSize: '8rem', fontWeight: 950, letterSpacing: '-6px', lineHeight: 0.9,
            marginBottom: '2rem', textTransform: 'uppercase'
          }}>
            SHIBUYA ZUDO<br />
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 50px rgba(6,182,212,0.3)' }}>WEALTH</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 3rem',
            lineHeight: 1.6, fontWeight: 600
          }}>
            L'apogée du prestige. Dominez avec des privilèges absolus et une autorité incontestée. 
            Découvrez la fusion parfaite entre technologie et influence.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setPage('roles')}>
              Rôles
            </button>
            <button className="btn-luxe" style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }} onClick={() => setPage('whitelist')}>
              Whitelist
            </button>
            <button className="btn-luxe" onClick={() => setPage('abonnements')}>
              Abonnements
            </button>
          </div>
        </div>
      </div>


      {/* RÔLES MIS EN AVANT */}
      <div id="prestige-section" style={{ paddingBottom: '10rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', letterSpacing: '-1px' }}>Rangs de <span style={{ color: 'var(--violet-light)' }}>Prestige</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Sélection exclusive des piliers de l'empire.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {featuredRoles.map((role, i) => (
              <RoleCard key={role.id} role={role} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>

      {/* BIG CTA LUXE */}
      <div style={{ paddingBottom: '10rem' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            border: '2px solid rgba(124, 58, 237, 0.15)', borderRadius: '60px', padding: '8rem 4rem',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 50px 120px rgba(0,0,0,0.5)', backdropFilter: 'blur(50px) saturate(180%)'
          }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '2rem', textTransform: 'uppercase', color: '#fff', lineHeight: 1 }}>Forgez votre <span style={{ color: 'var(--cyan)' }}>Légende</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.3rem', maxWidth: '750px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
              Ne soyez pas un simple utilisateur. Devenez un acteur majeur de Shibuya Zudo Wealth. 
              Le sommet est à portée de clic.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setPage('roles')}>Rôles</button>
              <button className="btn-luxe" style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }} onClick={() => setPage('whitelist')}>Whitelist</button>
              <button className="btn-luxe" onClick={() => setPage('abonnements')}>Nos Abonnements</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center', background: 'rgba(2, 2, 4, 0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ fontWeight: 950, fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', letterSpacing: '8px' }}>
          SHIBUYA ZUDO <span style={{ color: 'var(--cyan)' }}>WEALTH</span>
        </div>
        <div style={{ marginBottom: '3rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>L'Équilibre Absolute. L'Autorité Suprême.</div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '2px', opacity: 0.3 }}>© 2025 ZUDO EMPIRE. TOUS DROITS RÉSERVÉS.</div>
      </div>
    </div>
  );
};

export default Home;
