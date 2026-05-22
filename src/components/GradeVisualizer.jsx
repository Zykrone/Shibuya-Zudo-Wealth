import React, { useState, useEffect } from 'react';
import { ROLES, getCumulativePerms } from '../data';

// Select a curated list of prestigious roles to showcase
const DISPLAY_ROLES = ROLES.filter(r => [2, 4, 13, 16, 17].includes(r.id));

const GradeVisualizer = ({ setPage }) => {
  const [activeRoleId, setActiveRoleId] = useState(DISPLAY_ROLES[0].id);
  const [energyMultiplier, setEnergyMultiplier] = useState(1);
  const [typingText, setTypingText] = useState('');
  const [activeTab, setActiveTab] = useState('commands'); // commands or privileges

  const selectedRole = ROLES.find(r => r.id === activeRoleId);
  const cumulative = getCumulativePerms(activeRoleId);

  // Aura details based on role permission level
  const getAuraColor = (perm) => {
    switch (perm) {
      case 1: return 'rgba(99, 102, 241, '; // Co-owner (Indigo)
      case 3: return 'rgba(168, 85, 247, '; // Diamant (Purple)
      case 7: return 'rgba(239, 68, 68, '; // Admin (Red)
      case 9: return 'rgba(244, 114, 182, '; // Couronne (Pink)
      case 10: return 'rgba(251, 191, 36, '; // Créateur (Gold)
      default: return 'rgba(124, 58, 237, ';
    }
  };

  const getAuraLabel = (perm) => {
    if (perm >= 9) return 'CLASSE SPÉCIALE (S)';
    if (perm >= 6) return 'CLASSE 1';
    if (perm >= 3) return 'CLASSE 2';
    return 'SEMI-CLASSE 2';
  };

  // Simulate a terminal typing effect when the role changes
  useEffect(() => {
    let index = 0;
    const fullText = `INITIALIZING OVERRIDE // GRADE: ${selectedRole.name.toUpperCase()} // STATUS: SECURE`;
    setTypingText('');

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypingText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [activeRoleId]);

  const auraColor = getAuraColor(selectedRole.perm);
  const baseShadow = auraColor.includes('239') ? 'var(--glow-red)' : auraColor.includes('6,182') ? 'var(--glow-cyan)' : 'var(--glow-violet)';

  return (
    <div className="grade-visualizer-container">
      {/* Sidebar Selector */}
      <div className="grade-selector-sidebar">
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 900,
          letterSpacing: '2.5px',
          color: 'var(--text-muted)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          paddingLeft: '0.5rem'
        }}>
          ⛩️ Hiérarchie Occulte
        </div>
        {DISPLAY_ROLES.map((role) => (
          <button
            key={role.id}
            className={`grade-btn-modern ${activeRoleId === role.id ? 'active' : ''}`}
            onClick={() => {
              setActiveRoleId(role.id);
              setEnergyMultiplier(1); // Reset slider on change
            }}
          >
            <span>{role.emoji} {role.name}</span>
            <span className="grade-btn-badge">{getAuraLabel(role.perm)}</span>
          </button>
        ))}
      </div>

      {/* Main Display Screen */}
      <div className="grade-display-card">
        
        {/* Aura Sphere & Interactive Multiplier */}
        <div className="grade-aura-showcase">
          {/* Pulsing Aura Ring */}
          <div
            className="aura-glow-ring"
            style={{
              background: `radial-gradient(circle, ${auraColor}0.6) 0%, ${auraColor}0.1) 60%, transparent 100%)`,
              transform: `scale(${1 + (energyMultiplier - 1) * 0.4})`,
              boxShadow: `0 0 ${40 * energyMultiplier}px ${auraColor}0.5)`,
              filter: `blur(${15 + (energyMultiplier - 1) * 10}px)`
            }}
          />

          {/* Sphere Center */}
          <div
            className="grade-avatar-sphere"
            style={{
              borderColor: auraColor + '0.4)',
              boxShadow: `inset 0 0 25px ${auraColor}0.2), 0 0 ${30 * energyMultiplier}px ${auraColor}0.3)`,
              transform: `scale(${1 + (energyMultiplier - 1) * 0.1})`
            }}
          >
            <span style={{ 
              animation: 'floatUp 4s ease-in-out infinite alternate',
              textShadow: `0 0 15px ${auraColor}0.6)`
            }}>
              {selectedRole.emoji}
            </span>
          </div>
        </div>

        {/* Dynamic Role Info Panel */}
        <div className="grade-info-panel">
          <div>
            <div className="grade-power-title" style={{ color: selectedRole.color }}>
              {selectedRole.name}
            </div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 900,
              letterSpacing: '2px',
              color: 'var(--text-secondary)',
              marginTop: '0.2rem',
              textTransform: 'uppercase'
            }}>
              {getAuraLabel(selectedRole.perm)} // PERMISSION LEVEL: {selectedRole.perm}
            </div>
          </div>

          <p className="grade-power-desc">
            Explorez l'aura de puissance absolue de ce grade. Un investissement stratégique offrant un contrôle exceptionnel sur le domaine de Shibuya.
          </p>

          {/* Cursed Energy Level Interactive Slider */}
          <div className="cursed-energy-meter">
            <div className="meter-header">
              <span>🎚️ Canalisateur d'Énergie</span>
              <span style={{ color: 'var(--cyan-light)' }}>
                {Math.round(energyMultiplier * 100 * selectedRole.perm)} EV
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={energyMultiplier}
              onChange={(e) => setEnergyMultiplier(parseFloat(e.target.value))}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                height: '4px',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer',
                marginBottom: '0.8rem'
              }}
            />

            <div className="meter-bar-bg">
              <div
                className="meter-bar-fill"
                style={{
                  width: `${(energyMultiplier - 1) / 1.5 * 100}%`,
                  background: `linear-gradient(90deg, var(--violet), ${selectedRole.color})`,
                  boxShadow: `0 0 10px ${selectedRole.color}`
                }}
              />
            </div>
          </div>

          {/* Cyber Terminal showing direct / cumulative commands */}
          <div className="cyber-terminal">
            <div className="terminal-header-row">
              <span>{typingText}</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span 
                  onClick={() => setActiveTab('commands')} 
                  style={{ cursor: 'pointer', color: activeTab === 'commands' ? 'var(--cyan-light)' : 'inherit', fontWeight: activeTab === 'commands' ? 'bold' : 'normal' }}
                >
                  [COMMANDES]
                </span>
                <span 
                  onClick={() => setActiveTab('privileges')} 
                  style={{ cursor: 'pointer', color: activeTab === 'privileges' ? 'var(--cyan-light)' : 'inherit', fontWeight: activeTab === 'privileges' ? 'bold' : 'normal' }}
                >
                  [PRIVILÈGES]
                </span>
              </div>
            </div>

            <div className="terminal-cmds-grid">
              {activeTab === 'commands' ? (
                cumulative.cmds.length > 0 ? (
                  cumulative.cmds.map((cmd, index) => (
                    <span key={index} className="terminal-cmd-tag" style={{
                      background: `rgba(${selectedRole.perm * 20}, 58, 237, 0.15)`,
                      borderColor: selectedRole.color + '0.3)',
                      color: selectedRole.color
                    }}>
                      {cmd}
                    </span>
                  ))
                ) : (
                  <span className="terminal-cmd-tag empty">Aucune commande directe</span>
                )
              ) : (
                cumulative.perms.length > 0 ? (
                  cumulative.perms.map((perm, index) => (
                    <span key={index} className="terminal-cmd-tag" style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      borderColor: 'rgba(6, 182, 212, 0.3)',
                      color: 'var(--cyan-light)'
                    }}>
                      {perm}
                    </span>
                  ))
                ) : (
                  <span className="terminal-cmd-tag empty">Aucun privilège avancé</span>
                )
              )}
            </div>
          </div>

          {/* Direct CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 950, color: '#fff', fontFamily: 'var(--font-heading)' }}>
              {selectedRole.price}€ <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ à vie</span>
            </div>
            <button
              className="home-cta-btn home-cta-primary"
              style={{
                padding: '0.6rem 1.5rem',
                fontSize: '0.75rem',
                margin: 0,
                border: `1px solid ${selectedRole.color}0.5)`,
                boxShadow: `0 0 15px ${selectedRole.color}0.2)`
              }}
              onClick={() => {
                setPage('roles');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>⚔️</span> Découvrir
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GradeVisualizer;
