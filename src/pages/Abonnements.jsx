import React, { useState } from 'react';
import { SUBSCRIPTIONS } from '../data';

const TIER_LABELS = {
  silver: { label: 'ACCESS', color: '#94a3b8' },
  gold:   { label: 'TRENDING', color: '#f59e0b' },
  platinum: { label: 'ELITE', color: '#818cf8' },
  diamond: { label: 'ROYAL', color: '#38bdf8' },
  ruby:    { label: 'MYTHIC', color: '#e11d48' },
  opal:    { label: 'GODLY', color: '#a78bfa' },
};

const SubCard = ({ sub, delay = 0, isZoomed, onClick }) => {
  const meta = TIER_LABELS[sub.colorClass] || {};
  return (
    <div 
      id={`sub-${sub.id}`} 
      className={`sub-card cursed-card ${sub.colorClass} ${sub.featured ? 'featured' : ''} ${isZoomed ? 'zoomed' : ''}`} 
      style={{ 
        animationDelay: `${delay}s`,
        cursor: 'pointer',
        '--card-color': meta.color // For CSS access
      }}
      onClick={onClick}
    >
      
      {/* GRAPHIC HEADER - FULL IMAGE DISPLAY */}
      <div className="sub-badge-header">
        {sub.image && <img src={sub.image} alt={sub.name} className="sub-badge-img" />}
      </div>

      <div className="sub-card-body" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {meta.label && (
            <div style={{
              padding: '0.3rem 1rem', borderRadius: '10px',
              fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px',
              background: `${meta.color}10`, color: meta.color, border: `1px solid ${meta.color}30`
            }}>
              {meta.label}
            </div>
          )}
        </div>

        <div className="sub-name" style={{ color: '#fff', fontSize: '1.8rem', textAlign: 'center' }}>{sub.name}</div>
        {sub.subtitle && (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.4rem', fontWeight: 700 }}>
            {sub.subtitle}
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          {sub.oldPrice && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity: 0.5 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Avant</span>
              <span className="old-price" style={{ fontSize: '1.2rem', textDecoration: 'line-through' }}>{sub.oldPrice}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span className="sub-price" style={{ color: 'var(--cyan)', fontSize: '3.5rem', fontWeight: 950, lineHeight: 1 }}>{sub.price}</span>
            <span className="sub-price-unit" style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.9rem' }}>€/MOIS</span>
          </div>
        </div>

        <div className="sub-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', margin: '2rem 0', height: '1px' }} />

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.2rem', textAlign: 'center' }}>
            Privilèges Exclusifs
          </div>
          <ul className="sub-perks" style={{ listStyle: 'none', padding: 0 }}>
            {sub.avantages.map((a, i) => (
              <li key={i} style={{ color: 'var(--text-main)', marginBottom: '0.8rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: meta.color, fontSize: '1.2rem' }}>✦</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sub-divider" style={{ background: 'rgba(255,255,255,0.03)', margin: '2rem 0', height: '1px' }} />

        <div style={{ opacity: 0.6 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', textAlign: 'center' }}>
            Commandes Système
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {sub.cmds.map((c, i) => (
              <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sub-card-footer" style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ color: meta.color, fontSize: '0.7rem', fontWeight: 900, textAlign: 'center', letterSpacing: '4px', opacity: 0.7 }}>
          PREMIUM TIER
        </div>
      </div>
    </div>
  );
};

const AbonnementsPage = () => {
  const [zoomedId, setZoomedId] = useState(null);

  const scrollToSub = (id) => {
    const el = document.getElementById(`sub-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setZoomedId(id);
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '140px' }}>
      <div className="page-bg" />
      <div className="container">
        <div className="page-hero" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="hero-eyebrow" style={{ animationDelay: '0s' }}>
            <span>💎</span> INVESTISSEMENTS DE PRESTIGE
          </div>
          <h1 className="abonnements-title" style={{ margin: '1rem 0 2rem' }}>
            ABONNEMENTS
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
            Accédez aux strates suprêmes de l'influence. Chaque abonnement est une
            porte ouverte sur des technologies et permissions exclusives à l'empire.
          </p>
        </div>

        <div className={`subs-grid ${zoomedId ? 'has-zoomed' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem', marginBottom: '8rem' }}>
          {SUBSCRIPTIONS.map((sub, i) => (
            <SubCard 
              key={sub.id} 
              sub={sub} 
              delay={i * 0.1} 
              isZoomed={zoomedId === sub.id}
              onClick={() => setZoomedId(zoomedId === sub.id ? null : sub.id)}
            />
          ))}
        </div>

        {/* Tableau Comparatif Nettoyé */}
        <div style={{ marginTop: '10rem', paddingBottom: '10rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, textTransform: 'uppercase', color: '#fff', letterSpacing: '-1px' }}>
              Analyse <span style={{ color: 'var(--violet-light)' }}>Comparative</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Mise à jour en temps réel des capacités de chaque grade.</p>
          </div>

          <div className="price-table-wrap" style={{ 
            background: 'rgba(5, 4, 10, 0.6)', 
            backdropFilter: 'blur(20px)', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '32px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}>
            <table className="price-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', padding: '1rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1.5rem 2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px' }}>GRADE</th>
                  <th style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px' }}>MENSUEL</th>
                  <th style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px' }}>USAGE RERANK</th>
                  <th style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px' }}>ACCÈS</th>
                </tr>
              </thead>
              <tbody>
                {SUBSCRIPTIONS.map(sub => (
                  <tr key={sub.id} className="table-row-premium" style={{ transition: 'all 0.3s ease' }}>
                    <td style={{ padding: '1.2rem 2rem', borderRadius: '16px 0 0 16px', background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '4px' }}>
                          <img src={sub.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontWeight: 950, color: '#fff', fontSize: '1rem', letterSpacing: '1px' }}>{sub.name}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 950, fontSize: '1.3rem', textShadow: '0 0 15px rgba(6,182,212,0.3)' }}>{sub.price}€</span>
                    </td>
                    <td style={{ textAlign: 'center', color: '#fff', fontWeight: 800, background: 'rgba(255,255,255,0.02)' }}>
                       <span style={{ opacity: 0.9 }}>{sub.cmds.find(c => c.includes('rerank')) || '—'}</span>
                    </td>
                    <td style={{ textAlign: 'center', borderRadius: '0 16px 16px 0', background: 'rgba(255,255,255,0.02)' }}>
                      <button className="btn-detail" onClick={() => scrollToSub(sub.id)} style={{ 
                        padding: '0.6rem 1.5rem', 
                        fontSize: '0.7rem', 
                        borderRadius: '12px',
                        background: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.2)',
                        color: 'var(--violet-light)',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>EXPLORER ▶</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbonnementsPage;
