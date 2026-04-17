import React, { useEffect, useRef } from 'react';
import { WL_SECTIONS } from '../data';
import { useDiscount } from '../context/DiscountContext';
import { calculateWLPrice } from '../utils/pricing';
import PriceDisplay from '../components/PriceDisplay';

const WLCard = ({ card, delay = 0 }) => {
  const { discounts } = useDiscount();
  const pricing = calculateWLPrice(card, discounts);
  const cardRef = useRef(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const handleMouseMove = (e) => {
      const rect = cardEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardEl.style.setProperty('--mouse-x', `${x}%`);
      cardEl.style.setProperty('--mouse-y', `${y}%`);
    };

    cardEl.addEventListener('mousemove', handleMouseMove);
    return () => cardEl.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`wl-card-modern ${pricing.hasDiscount ? 'discounted' : ''}`}
      style={{ animationDelay: `${delay}s`, position: 'relative' }}
    >
      {pricing.hasDiscount && (
        <>
          <div className="cursed-flame-wrap">
            <div className="cursed-flame"></div>
          </div>
          <div className="global-discount-badge">
            <span className="reduction-label">RÉDUCTION</span>
            -{pricing.discountPercent}%
          </div>
        </>
      )}

      {/* Badge pré-requis flottant */}
      {card.req && (
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
          <span style={{
            padding: '0.4rem 1rem', borderRadius: '100px',
            background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)',
            border: '1px solid rgba(6,182,212,0.3)', fontSize: '0.6rem', fontWeight: 950,
            textTransform: 'uppercase', letterSpacing: '2px', backdropFilter: 'blur(5px)'
          }}>
            REQUIS : {card.req}
          </span>
        </div>
      )}

      {/* Titre & Desc */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{
          color: '#fff', fontSize: '2rem', fontWeight: 950,
          marginBottom: '0.8rem', letterSpacing: '-1px', textTransform: 'uppercase',
          lineHeight: 1
        }}>
          {card.name}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem',
          lineHeight: 1.6, fontWeight: 500
        }}>
          {card.desc}
        </p>
      </div>

      {/* Features List as Cyber-Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {card.features.map((f, i) => {
          const isWarning = f.startsWith('⚠️');
          const fullText = f.replace('☐ ', '').replace('⚠️ ', '');
          
          let cmdPart = "";
          let descPart = fullText;
          if (fullText.includes(' - ')) {
            [cmdPart, descPart] = fullText.split(' - ');
          } else if (fullText.startsWith('/')) {
            const firstSpace = fullText.indexOf(' ');
            if (firstSpace !== -1) {
              cmdPart = fullText.substring(0, firstSpace);
              descPart = fullText.substring(firstSpace + 1);
            }
          }

          return (
            <div key={i} className={`cyber-pill ${isWarning ? 'warning' : ''}`}>
              <div className="pill-icon" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cmdPart ? (
                  <>
                    <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 900, fontFamily: 'monospace' }}>
                      {cmdPart}
                    </span>
                    <span style={{ color: isWarning ? 'var(--cyan)' : 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {descPart}
                    </span>
                  </>
                ) : (
                  <span style={{ color: isWarning ? 'var(--cyan)' : '#fff', fontSize: '0.9rem', fontWeight: 700 }}>
                    {descPart}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Price Tag */}
      <div className="modern-price-tag">
        <PriceDisplay 
          original={pricing.original} 
          final={pricing.final} 
          hasDiscount={pricing.hasDiscount}
          size="large"
        />
      </div>
    </div>
  );
};

const WhitelistPage = () => (
  <div className="page-wrapper">
    <div className="page-bg" />
    <div className="container">

      <div className="page-hero" style={{ textAlign: 'center', marginBottom: '8rem', paddingTop: '6rem' }}>
        <div className="hero-eyebrow" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)', borderColor: 'rgba(6,182,212,0.3)' }}>
          <span>🛠️</span> ARSENAL DE L'EMPIRE
        </div>
        <h1 className="abonnements-title" style={{ fontSize: '7rem', margin: '1rem 0 2.5rem' }}>
          WHITELIST
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: '1.3rem',
          maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, fontWeight: 500
        }}>
          Dominez le système avec des privilèges de pointe. 
          Une suite d'outils d'élite pour une autorité absolue.
        </p>
      </div>

      {WL_SECTIONS.map((section) => (
        <div key={section.id} style={{ marginBottom: '12rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2rem',
            marginBottom: '4rem', paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              width: '70px', height: '70px', borderRadius: '24px',
              background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', flexShrink: 0,
              boxShadow: '0 0 30px rgba(124,58,237,0.2)'
            }}>
              {section.icon}
            </div>
            <div>
              <h2 style={{
                fontSize: '2.5rem', fontWeight: 950, color: '#fff',
                textTransform: 'uppercase', letterSpacing: '-1px', margin: 0,
              }}>
                {section.title}
              </h2>
              <p style={{
                color: 'var(--violet-light)', fontSize: '1.1rem',
                marginTop: '0.5rem', fontWeight: 700, opacity: 0.7
              }}>
                {section.desc}
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', 
            gap: '2.5rem',
          }}>
            {section.cards.map((card, i) => (
              <WLCard key={card.name} card={card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      ))}

      <div style={{ height: '10rem' }} />
    </div>
  </div>
);

export default WhitelistPage;
