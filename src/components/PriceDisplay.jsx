import React from 'react';

const PriceDisplay = ({ original, final, hasDiscount, size = 'medium' }) => {
  // On s'assure que le symbole € n'est pas doublé
  const formatPrice = (val) => {
    if (typeof val === 'string' && val.includes('€')) return val;
    return `${val}€`;
  };

  if (!hasDiscount) {
    return (
      <div className={`price-display-wrapper ${size}`}>
        <span className="price-final">{formatPrice(final)}</span>
      </div>
    );
  }

  return (
    <div className={`price-display-wrapper discounted ${size}`}>
      <span className="price-original">{formatPrice(original)}</span>
      <span className="price-final">{formatPrice(final)}</span>
    </div>
  );
};

export default PriceDisplay;
