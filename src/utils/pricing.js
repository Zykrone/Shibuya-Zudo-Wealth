// utils/pricing.js

// Applique la réduction à un rôle
export const calculateRolePrice = (role, discounts) => {
  let discountPercent = 0;

  // Couronne (ID: 16)
  if (role.id === 16) {
    if (discounts.couronneRole) discountPercent = 15;
  }
  // Créateur (ID: 17)
  else if (role.id === 17) {
    if (discounts.createurRole) discountPercent = 10;
  }
  // Tous les autres rôles
  else {
    if (discounts.globalRole) discountPercent = 20;
  }

  if (discountPercent === 0) return { original: role.price, final: role.price, hasDiscount: false };

  const discountedPrice = role.price * (1 - discountPercent / 100);
  
  // Arrondir joliment (ex: 15.99 au lieu de 15.992)
  const finalPrice = Math.round(discountedPrice * 100) / 100;

  return {
    original: role.price,
    final: finalPrice,
    discountPercent,
    hasDiscount: true
  };
};

// Applique la réduction à un élément Whitelist
export const calculateWLPrice = (card, discounts) => {
  let discountPercent = 0;
  const nameUpper = card.name.toUpperCase();

  if (nameUpper.includes('OWNER')) {
    if (discounts.ownerWl) discountPercent = 15;
  } else if (nameUpper.includes('SYS')) {
    if (discounts.sysWl) discountPercent = 10;
  }

  if (discountPercent === 0) return { original: card.price, final: card.price, hasDiscount: false };

  // Parse le prix ("150 €" ou "150 € + 30 € / mois")
  const priceString = card.price;
  
  // On extrait le premier nombre qui correspond au prix d'achat
  const match = priceString.match(/^(\d+)(.*)/);
  if (!match) return { original: card.price, final: card.price, hasDiscount: false };

  const basePrice = parseInt(match[1], 10);
  const restOfString = match[2];

  const discountedPrice = Math.round(basePrice * (1 - discountPercent / 100));

  return {
    original: card.price,
    final: `${discountedPrice}${restOfString}`,
    discountPercent,
    hasDiscount: true
  };
};
