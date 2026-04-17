import React, { useState } from 'react';
import { getCumulativePerms } from '../data';

const RoleCard = ({ role, delay = 0 }) => {
  const [showModal, setShowModal] = useState(false);
  const { cmds, perms, total } = getCumulativePerms(role.id);

  const directCmdsCount = role.directCmds.length;
  const inheritedCmdsCount = cmds.length - directCmdsCount;

  return (
    <>
      <div 
        className="role-card-premium" 
        style={{ animationDelay: `${delay}s` }}
        onClick={() => setShowModal(true)}
      >
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
          <div className="role-price-tag">{role.price} €</div>
        </div>

        <div className="role-card-footer">
          <div className="stat-pill">
            <span className="stat-val">{cmds.length}</span>
            <span className="stat-label">COMMANDES</span>
          </div>
          <button className="role-view-btn">DÉTAILS</button>
        </div>
      </div>

      {/* POP-OUT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header-luxe" style={{ borderBottomColor: `${role.permColor}30` }}>
              <div className="modal-badge">FICHE PERMISSION</div>
              <div className="modal-title-row">
                <div className="modal-emoji-big">{role.emoji}</div>
                <div>
                  <h2 className="modal-role-name">{role.name}</h2>
                  <div className="modal-role-subline">Niveau d'autorité {role.perm} — Lecture détaillée des privilèges</div>
                </div>
              </div>
              
              <div className="modal-stats-row">
                <div className="modal-stat-box">
                  <div className="val">{directCmdsCount}</div>
                  <div className="lab">Directes</div>
                </div>
                <div className="modal-stat-box">
                  <div className="val">{inheritedCmdsCount}</div>
                  <div className="lab">Héritées</div>
                </div>
                <div className="modal-stat-box featured">
                  <div className="val">{total}</div>
                  <div className="lab">Total Accès</div>
                </div>
              </div>

              <button className="modal-close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <div className="modal-body-luxe">
              <div className="modal-grid">
                <div className="modal-column">
                  <h4 className="column-title"><span className="dot" /> COMMANDES DIRECTES</h4>
                  <ul className="modal-list">
                    {role.directCmds.map((c, i) => <li key={i}>{c}</li>)}
                    {role.directCmds.length === 0 && <li className="empty">Aucune commande directe</li>}
                  </ul>
                </div>

                <div className="modal-column">
                  <h4 className="column-title" style={{ color: 'var(--cyan)' }}><span className="dot" style={{ background: 'var(--cyan)' }} /> PERMISSIONS DIRECTES</h4>
                  <ul className="modal-list">
                    {role.directPerms.map((p, i) => <li key={i}>{p}</li>)}
                    {role.directPerms.length === 0 && <li className="empty">Aucune permission spéciale</li>}
                  </ul>
                </div>
              </div>

              <div className="modal-inheritance-box">
                <div className="inheritance-title">Héritage Systémique</div>
                <p>Ce grade inclut nativement toutes les permissions des rangs inférieurs de niveau {role.perm - 1} et moins.</p>
              </div>
            </div>
            
            <div className="modal-footer-luxe">
              <div className="footer-price">{role.price} € <span style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 500 }}>PAIEMENT UNIQUE</span></div>
              <button className="btn-buy-simple">S'APPROPRIER LE RANG</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleCard;
