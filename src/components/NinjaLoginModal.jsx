import React, { useState, useEffect } from 'react';
import { useDiscount } from '../context/DiscountContext';

const NinjaLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { loginSecretAdmin } = useDiscount();

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginSecretAdmin(code)) {
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ninja-modal-overlay" onClick={onClose}>
      <div 
        className={`ninja-modal-content ${error ? 'error-shake' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-close" onClick={onClose}>&times;</div>
        
        <div className="ninja-modal-header">
          <div className="ninja-avatar">🥷</div>
          <h2>ACCÈS RESTREINT</h2>
          <p>Scellez le domaine avec votre clé secrète</p>
        </div>

        <form onSubmit={handleSubmit} className="ninja-modal-form">
          <div className="input-wrap">
            <input 
              type="password" 
              placeholder="Code d'accès..." 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
              className={error ? 'error' : ''}
            />
            <div className="input-glow" />
          </div>

          <button type="submit" className="ninja-submit-btn">
            DÉVERROUILLER
          </button>
        </form>

        <div className="ninja-modal-footer">
          L'Équilibre est tout ce qui compte.
        </div>
      </div>
    </div>
  );
};

export default NinjaLoginModal;
