import React from 'react';
import { ROLES, WL_SECTIONS, SUBSCRIPTIONS } from '../data';
import RoleCard from '../components/RoleCard';
import VideoBackground from '../components/VideoBackground';

const Home = ({ setPage }) => {
  const totalRoles = ROLES.filter(r => r.price).length;
  const totalWL = WL_SECTIONS.reduce((acc, s) => acc + s.cards.length, 0);
  const featuredRoles = ROLES.filter(r => r.price && r.perm >= 6).slice(0, 3);

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>

      {/* ── HERO CINÉMATIQUE ── */}
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', textAlign: 'center'
      }}>
        {/* Video + overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <VideoBackground videoId="lm47T73ARgI" opacity={0.45} start={10} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.25) 0%, rgba(5,4,10,0.9) 70%)',
          }} />
          {/* Ligne de lueur basse */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--violet), var(--cyan), var(--violet), transparent)',
            opacity: 0.6
          }} />
        </div>

        {/* Contenu hero */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Badge eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '100px', padding: '0.6rem 1.5rem', marginBottom: '2.5rem',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--violet-light)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(124,58,237,0.2)'
          }}>
            <span style={{ color: 'var(--cyan)', fontSize: '1rem' }}>⚡</span>
            L'EMPIRE DE L'INFLUENCE
          </div>

          {/* Titre principal */}
          <h1 style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 950, lineHeight: 0.9,
            textTransform: 'uppercase', letterSpacing: '-3px',
            marginBottom: '2.5rem', color: '#fff',
            textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 150px rgba(124,58,237,0.3)',
          }}>
            SHIBUYA ZUDO<br />
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '2px var(--cyan)',
              textShadow: '0 0 40px rgba(6,182,212,0.5)',
              display: 'block', marginTop: '0.1em'
            }}>WEALTH</span>
          </h1>

          {/* Description */}
          <p style={{
            color: 'rgba(255,255,255,0.65)', fontSize: '1.2rem',
            maxWidth: '650px', margin: '0 auto 3.5rem',
            lineHeight: 1.7, fontWeight: 500,
          }}>
            L'apogée du prestige. Dominez avec des privilèges absolus et une autorité incontestée.
            La fusion parfaite entre technologie et influence.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('roles')}>
              <span>⚔️</span> Explorer les Rôles
            </button>
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('whitelist')}>
              <span>🛡️</span> Accès Whitelist
            </button>
            <button className="home-cta-btn home-cta-primary" onClick={() => setPage('abonnements')}>
              <span>💎</span> Nos Abonnements
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '5rem',
            flexWrap: 'wrap'
          }}>
            {[
              { val: totalRoles, label: 'Rôles Exclusifs' },
              { val: totalWL, label: 'Modules Whitelist' },
              { val: SUBSCRIPTIONS.length, label: 'Abonnements' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '1.2rem 2rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', backdropFilter: 'blur(10px)',
                textAlign: 'center', minWidth: '130px'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--cyan)', lineHeight: 1 }}>{s.val}+</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '0.4rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: 0.4, animation: 'scrollBounce 2s infinite ease-in-out'
        }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '3px', fontWeight: 800, textTransform: 'uppercase', color: '#fff' }}>DÉCOUVRIR</div>
          <div style={{ fontSize: '1.2rem' }}>↓</div>
        </div>
      </div>

      {/* ── RANGS DE PRESTIGE ── */}
      <div style={{ padding: '10rem 0' }}>
        <div className="container">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '4px',
              color: 'var(--violet-light)', textTransform: 'uppercase', marginBottom: '1.5rem',
              padding: '0.5rem 1.5rem', background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.25)', borderRadius: '100px'
            }}>Section 01 — Hiérarchie</div>
            <h2 style={{
              fontSize: '3.5rem', fontWeight: 950, textTransform: 'uppercase',
              color: '#fff', letterSpacing: '-1px', marginBottom: '1rem'
            }}>
              Rangs de <span style={{ color: 'var(--violet-light)' }}>Prestige</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', fontWeight: 600 }}>
              Sélection exclusive des piliers de l'empire.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
            {featuredRoles.map((role, i) => (
              <RoleCard key={role.id} role={role} delay={i * 0.15} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="home-cta-btn home-cta-ghost" onClick={() => setPage('roles')}>
              Voir tous les rôles ▶
            </button>
          </div>
        </div>
      </div>

      {/* ── BIG CTA FORGEZ VOTRE LÉGENDE ── */}
      <div style={{ padding: '0 0 10rem' }}>
        <div className="container">
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: '48px', padding: '8rem 4rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
          }}>
            {/* Orbe décoratif */}
            <div style={{
              position: 'absolute', top: '-100px', right: '-100px',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute', bottom: '-100px', left: '-100px',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{
              fontSize: '0.7rem', fontWeight: 900, letterSpacing: '4px',
              color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '2rem',
              padding: '0.5rem 1.5rem', background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)', borderRadius: '100px',
              display: 'inline-block'
            }}>Section 02 — Ascension</div>

            <h2 style={{
              fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 950,
              color: '#fff', textTransform: 'uppercase', lineHeight: 1,
              marginBottom: '2rem', letterSpacing: '-2px',
              textShadow: '0 0 60px rgba(255,255,255,0.1)'
            }}>
              Forgez votre <span style={{ color: 'var(--cyan)' }}>Légende</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '1.15rem',
              maxWidth: '650px', margin: '0 auto 4rem', lineHeight: 1.7, fontWeight: 500
            }}>
              Ne soyez pas un simple utilisateur. Devenez un acteur majeur de Shibuya Zudo Wealth.
              Le sommet est à portée de clic.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('roles')}>Rôles</button>
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('whitelist')}>Whitelist</button>
              <button className="home-cta-btn home-cta-primary" onClick={() => setPage('abonnements')}>Abonnements</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        padding: '5rem 2rem 4rem', textAlign: 'center',
        background: 'rgba(2,2,4,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{
          fontWeight: 950, fontSize: '2rem', marginBottom: '0.75rem',
          color: '#fff', letterSpacing: '8px', textTransform: 'uppercase'
        }}>
          SHIBUYA ZUDO <span style={{ color: 'var(--cyan)' }}>WEALTH</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '2rem' }}>
          L'Équilibre Absolu. L'Autorité Suprême.
        </div>
        <div style={{ fontSize: '0.65rem', letterSpacing: '2px', opacity: 0.2 }}>© 2025 ZUDO EMPIRE. TOUS DROITS RÉSERVÉS.</div>
      </div>
    </div>
  );
};

export default Home;
