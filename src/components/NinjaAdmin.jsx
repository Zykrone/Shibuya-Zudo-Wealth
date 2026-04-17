import React, { useState } from 'react';
import { useDiscount } from '../context/DiscountContext';
import NinjaLoginModal from './NinjaLoginModal';
import NinjaLogoutModal from './NinjaLogoutModal';

const NinjaAdmin = ({ setPage }) => {
  const { isSecretAdmin, logoutSecretAdmin } = useDiscount();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleToggle = () => {
    if (isSecretAdmin) {
      setIsLogoutOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLogoutConfirm = () => {
    logoutSecretAdmin();
    setIsLogoutOpen(false);
    setPage('home');
  };

  const handleLoginSuccess = () => {
    setPage('admin');
  };

  return (
    <>
      <div 
        className={`ninja-admin-toggle ${isSecretAdmin ? 'active' : ''}`} 
        onClick={handleToggle}
        title={isSecretAdmin ? 'Désactiver Admin' : 'Accès Privé'}
      >
        <span className="ninja-icon">🥷</span>
      </div>

      <NinjaLoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <NinjaLogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default NinjaAdmin;
