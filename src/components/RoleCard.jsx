import React, { useState } from 'react';
import { ROLES } from '../data';
import { useDiscount } from '../context/DiscountContext';
import { calculateRolePrice } from '../utils/pricing';
import PriceDisplay from './PriceDisplay';

/* Retourne les rôles inférieurs (source des héritages) pour un rôle donné */
const getInheritedRoles = (role) => {
  return ROLES.filter(r => r.id < role.id && r.perm <= role.perm);
};

const RoleCard = ({ role, delay = 0 }) => {
  const [showModal, setShowModal] = useState(false);
  const [showInherited, setShowInherited] = useState(false);

  const { discounts } = useDiscount();

  const inheritedRoles = getInheritedRoles(role);

  // Calcul du prix
  const isPriced = typeof role.price === 'number';
  const pricing = isPriced ? calculateRolePrice(role, discounts) : { original: role.price, final: role.price, hasDiscount: false };

  const totalCmds = role.directCmds.length +
    inheritedRoles.reduce((acc, r) => acc + r.directCmds.length, 0);
  const totalPerms = role.directPerms.length +
    inheritedRoles.reduce((acc, r) => acc + r.directPerms.length, 0);

  return (
    <>
      {/* ───── CARTE ───── */}
      <div
        className={`role-card-premium ${pricing.hasDiscount ? 'discounted' : ''}`}
        style={{ animationDelay: `${delay}s`, position: 'relative' }}
        onClick={() => setShowModal(true)}
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

        <div className="role-card-glow" style={{ background: role.permColor }} />

        <div className="role-card-header">
          <div className="role-emoji">{role.emoji}</div>
          <div className="role-perm-info">
            <span className="perm-level" style={{ color: role.permColor }}>NIVEAU {role.perm}</span>
            <span className="perm-id">ID #{role.id}</span>
          </div>
        </div>

        <div className="role-card-content">
          <h3 className="role-name">{role.name}</h3>
          <div className="role-price-tag">
            <PriceDisplay 
              original={pricing.original} 
              final={pricing.final} 
              hasDiscount={pricing.hasDiscount}
              size="small"
            />
          </div>
        </div>

        <div className="role-card-footer">
          <div className="stat-pill">
            <span className="stat-val">{totalCmds + totalPerms}</span>
            <span className="stat-label">ACCÈS TOTAL</span>
          </div>
          <button className="role-view-btn">DÉTAILS</button>
        </div>
      </div>

      {/* ───── MODAL ───── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setShowInherited(false); }}>
          <div className="modal-content rc-modal" onClick={e => e.stopPropagation()}>

            {/* HEADER */}
            <div className="modal-header-luxe" style={{ borderBottom: `1px solid ${role.permColor}30` }}>
              <div className="modal-badge">FICHE PERMISSION</div>
              <div className="modal-title-row">
                <div className="modal-emoji-big">{role.emoji}</div>
                <div>
                  <h2 className="modal-role-name">{role.name}</h2>
                  <div className="modal-role-subline">
                    Niveau d'autorité {role.perm} — Lecture détaillée des privilèges
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="modal-stats-row">
                <div className="modal-stat-box">
                  <div className="val" style={{ color: role.permColor }}>{role.directCmds.length}</div>
                  <div className="lab">Nouvelles cmds</div>
                </div>
                <div className="modal-stat-box">
                  <div className="val" style={{ color: 'var(--cyan)' }}>{role.directPerms.length}</div>
                  <div className="lab">Nouvelles perms</div>
                </div>
                <div className="modal-stat-box featured">
                  <div className="val">{totalCmds + totalPerms}</div>
                  <div className="lab">Total Accès</div>
                </div>
              </div>

              <button className="modal-close-btn" onClick={() => { setShowModal(false); setShowInherited(false); }}>&times;</button>
            </div>

            {/* BODY */}
            <div className="modal-body-luxe">

              {/* Section Nouvelles Commandes + Nouvelles Permissions */}
              <div className="rc-new-sections">

                {/* Nouvelles Commandes */}
                <div className="rc-section">
                  <div className="rc-section-header">
                    <div className="rc-section-icon" style={{ background: `${role.permColor}20`, borderColor: `${role.permColor}40` }}>
                      <span style={{ color: role.permColor }}>⚡</span>
                    </div>
                    <div>
                      <div className="rc-section-title" style={{ color: role.permColor }}>Nouvelles commandes</div>
                      <div className="rc-section-sub">{role.directCmds.length} commande{role.directCmds.length !== 1 ? 's' : ''} exclusive{role.directCmds.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="rc-items-list">
                    {role.directCmds.length > 0
                      ? role.directCmds.map((c, i) => (
                        <div key={i} className="rc-item rc-item-cmd">
                          <span className="rc-item-bullet" style={{ background: role.permColor }} />
                          <span className="rc-item-text">{c}</span>
                        </div>
                      ))
                      : <div className="rc-empty">Aucune commande exclusive à ce rang</div>
                    }
                  </div>
                </div>

                {/* Nouvelles Permissions */}
                <div className="rc-section">
                  <div className="rc-section-header">
                    <div className="rc-section-icon" style={{ background: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.3)' }}>
                      <span style={{ color: 'var(--cyan)' }}>🔓</span>
                    </div>
                    <div>
                      <div className="rc-section-title" style={{ color: 'var(--cyan)' }}>Nouvelles permissions</div>
                      <div className="rc-section-sub">{role.directPerms.length} permission{role.directPerms.length !== 1 ? 's' : ''} exclusive{role.directPerms.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="rc-items-list">
                    {role.directPerms.length > 0
                      ? role.directPerms.map((p, i) => (
                        <div key={i} className="rc-item rc-item-perm">
                          <span className="rc-item-bullet" style={{ background: 'var(--cyan)' }} />
                          <span className="rc-item-text">{p}</span>
                        </div>
                      ))
                      : <div className="rc-empty">Aucune permission spéciale à ce rang</div>
                    }
                  </div>
                </div>
              </div>

              {/* Bouton Permissions héritées */}
              {inheritedRoles.length > 0 && (
                <div className="rc-inherited-wrap">
                  <button
                    className="rc-inherited-toggle"
                    onClick={() => setShowInherited(v => !v)}
                  >
                    <span className="rc-toggle-icon">{showInherited ? '▲' : '▼'}</span>
                    <span>Autres permissions</span>
                    <span className="rc-inherited-badge">
                      {inheritedRoles.reduce((a, r) => a + r.directCmds.length + r.directPerms.length, 0)} héritées
                    </span>
                  </button>

                  {showInherited && (
                    <div className="rc-inherited-panel">
                      <div className="rc-inherited-label">
                        Toutes les permissions obtenues via les rangs précédents
                      </div>
                      {inheritedRoles.map(src => {
                        const hasSomething = src.directCmds.length > 0 || src.directPerms.length > 0;
                        if (!hasSomething) return null;
                        return (
                          <div key={src.id} className="rc-source-block">
                            <div className="rc-source-header">
                              <span className="rc-source-dot" style={{ background: src.permColor }} />
                              <span className="rc-source-emoji">{src.emoji}</span>
                              <span className="rc-source-name">{src.name}</span>
                              <span className="rc-source-perm" style={{ color: src.permColor }}>NV.{src.perm}</span>
                            </div>
                            <div className="rc-source-items">
                              {src.directCmds.map((c, i) => (
                                <div key={`cmd-${i}`} className="rc-source-item rc-source-cmd">
                                  <span>⚡</span> {c}
                                </div>
                              ))}
                              {src.directPerms.map((p, i) => (
                                <div key={`perm-${i}`} className="rc-source-item rc-source-perm-item">
                                  <span>🔓</span> {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="modal-footer-luxe">
              <div className="footer-price" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <PriceDisplay 
                    original={pricing.original} 
                    final={pricing.final} 
                    hasDiscount={pricing.hasDiscount}
                    size="medium"
                  />
                  {pricing.hasDiscount && (
                    <div className="global-discount-badge" style={{ position: 'static', transform: 'none', animation: 'none' }}>
                      -{pricing.discountPercent}% RÉDUCTION
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 800, letterSpacing: '2px' }}>PAIEMENT UNIQUE</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default RoleCard;
