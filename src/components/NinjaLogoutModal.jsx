import React from 'react';

const NinjaLogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay ninja-modal-overlay" onClick={onClose}>
      <div className="ninja-login-modal logout-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="ninja-eye-icon">⚠️</div>
          <h2>DÉCONNEXION</h2>
          <p>Souhaitez-vous désactiver l'accès aux privilèges d'administration ?</p>
        </div>

        <div className="logout-actions">
          <button className="btn-logout-confirm" onClick={onConfirm}>
            DÉSACTIVER
          </button>
          <button className="btn-logout-cancel" onClick={onClose}>
            ANNULER
          </button>
        </div>

        <div className="modal-decoration">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </div>
    </div>
  );
};

export default NinjaLogoutModal;
