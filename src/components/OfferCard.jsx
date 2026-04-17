import React from 'react';
import { useAuth } from '../context/AuthContext';

const OfferCard = ({ product, onEdit, onBuy }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Univers';

  return (
    <div className={`offer-card ${product.featured ? 'featured' : ''}`}>
      {product.badge && (
        <span className={`offer-badge ${product.badge}`}>
          {product.badge === 'popular' ? '🔥 Populaire' : product.badge === 'exclusive' ? '💎 Exclusif' : '✨ Nouveau'}
        </span>
      )}
      <div className="offer-card-body">
        <span className="offer-icon">{product.icon}</span>
        <h3 className="offer-name">{product.name}</h3>
        <p className="offer-desc">{product.desc}</p>
        
        <div className="offer-price">{product.price}€</div>
        {product.priceOld && <div className="offer-price-old">{product.priceOld}€</div>}
        
        <ul className="offer-perks">
          {product.perks?.map((perk, i) => <li key={i}>{perk}</li>)}
        </ul>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {isAdmin ? (
            <button className="btn-primary btn-sm" onClick={() => onEdit(product)}>✏️ Modifier</button>
          ) : (
            <button className={product.featured ? 'btn-gold' : 'btn-primary'} style={{ flex: 1, justifyContent: 'center' }} onClick={() => onBuy(product)}>
              {product.featured ? '💎 Acheter' : '🛒 Acheter'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
