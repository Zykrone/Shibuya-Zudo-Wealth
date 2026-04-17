import React, { createContext, useContext, useState, useEffect } from 'react';

const DiscountContext = createContext();
export const useDiscount = () => useContext(DiscountContext);

export const DiscountProvider = ({ children }) => {
  // --- Secret Admin Access ---
  const [isSecretAdmin, setIsSecretAdmin] = useState(() => {
    return localStorage.getItem('shibuya_secret_admin') === 'true';
  });

  const loginSecretAdmin = (code) => {
    if (code === '2164857') {
      setIsSecretAdmin(true);
      localStorage.setItem('shibuya_secret_admin', 'true');
      return true;
    }
    return false;
  };

  const logoutSecretAdmin = () => {
    setIsSecretAdmin(false);
    localStorage.removeItem('shibuya_secret_admin');
  };

  // --- Discounts State ---
  const [discounts, setDiscounts] = useState(() => {
    const saved = localStorage.getItem('shibuya_discounts');
    if (saved) return JSON.parse(saved);
    return {
      globalRole: false,
      couronneRole: false,
      createurRole: false,
      ownerWl: false,
      sysWl: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('shibuya_discounts', JSON.stringify(discounts));
  }, [discounts]);

  const toggleDiscount = (key) => {
    setDiscounts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DiscountContext.Provider value={{
      isSecretAdmin, loginSecretAdmin, logoutSecretAdmin,
      discounts, toggleDiscount
    }}>
      {children}
    </DiscountContext.Provider>
  );
};
