import React from 'react';
import { WL_SECTIONS } from '../data';

const WLCard = ({ card, delay = 0 }) => {
  const hasFeatures = card.features && card.features.length > 0;
  return (
    <div className={`wl-card cursed-card`} style={{ 
      animationDelay: `${delay}s`, 
      padding: hasFeatures ? '2.5rem' : '1.8rem 2.5rem',
      height: '100%',
      borderRadius: '24px',
      margin: 0
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {card.req && (
          <div style={{ marginBottom: hasFeatures ? '1.5rem' : '1rem' }}>
            <span style={{ 
              padding: '0.4rem 1rem', borderRadius: '12px', 
              background: 'rgba(6, 182, 212, 0.1)', color: 'var(--cyan)', 
              border: '1px solid rgba(6, 182, 212, 0.2)', fontSize: '0.7rem', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              Pré-requis: {card.req}
            </span>
          </div>
        )}

        <h3 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: hasFeatures ? '1rem' : '0.5rem', letterSpacing: '-0.5px' }}>{card.name}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: hasFeatures ? '2rem' : '1.5rem' }}>{card.desc}</p>

        {hasFeatures && (
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
            {card.features.map((f, i) => {
              const isWarning = f.startsWith('⚠️');
              return (
                <li key={i} style={{
                  color: isWarning ? 'var(--cyan)' : 'var(--text-main)',
                  background: isWarning ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
                  borderRadius: isWarning ? '16px' : 0,
                  padding: isWarning ? '1rem' : '0.4rem 0',
                  fontSize: isWarning ? '0.85rem' : '0.95rem',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  border: isWarning ? '1px solid rgba(6, 182, 212, 0.1)' : 'none',
                  marginTop: isWarning ? '1.5rem' : 0,
                  fontWeight: isWarning ? 700 : 400
                }}>
                  <span style={{ color: 'var(--cyan)', fontSize: '1.1rem' }}>✦</span>
                  <span style={{ lineHeight: 1.4 }}>{f.replace('☐ ', '').replace('⚠️ ', '')}</span>
                </li>
              );
            })}
          </ul>
        )}

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: hasFeatures ? '2.5rem' : '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="wl-price-tag" style={{ fontSize: hasFeatures ? '2.2rem' : '1.8rem', padding: hasFeatures ? '1rem 2.5rem' : '0.8rem 2rem' }}>
            {card.price}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhitelistPage = () => (
  <div className="page-wrapper">
    <div className="page-bg" />
    <div className="container">
      <div className="page-hero" style={{ textAlign: 'center', marginBottom: '6rem', paddingTop: '4rem' }}>
        <div className="hero-eyebrow">
          <span>🛠️</span> Arsenal de l'Empire
        </div>
        <h1>Whitelist</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
          Optimisez votre influence avec des privilèges techniques de pointe. 
          Des outils de modération aux accès vocaux exclusifs.
        </p>
      </div>

      {WL_SECTIONS.map((section) => (
        <div key={section.id} style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="section-icon-container">
              {section.icon}
            </div>
            <div>
              <h2 className="jjk-heading" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
              <p style={{ color: 'var(--violet-light)', opacity: 0.8, fontSize: '1rem', marginTop: '0.5rem' }}>{section.desc}</p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '1rem',
          }}>
            {section.cards.map((card, i) => (
              <WLCard key={card.name} card={card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      ))}

      <div style={{ height: '6rem' }} />
    </div>
  </div>
);

export default WhitelistPage;
