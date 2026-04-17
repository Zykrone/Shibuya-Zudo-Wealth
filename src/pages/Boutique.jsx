import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import OfferCard from '../components/OfferCard';
import EditProductModal from '../components/EditProductModal';

const BuyModal = ({ product, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal-box" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{product.icon}</div>
      <h3>{product.name} — {product.price}€</h3>
      <p>Pour procéder à l'achat, contactez un administrateur sur le Discord de Shibuya ou rejoignez notre serveur.</p>
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(124,58,237,0.1)', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.2)' }}>
        <p style={{ color: 'var(--accent-light)', fontWeight: 600, marginBottom: '0.5rem' }}>📋 Procédure d'achat</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>1. Rejoignez notre Discord<br/>2. Ouvrez un ticket d'achat<br/>3. Précisez l'offre souhaitée<br/>4. Effectuez le paiement via les moyens acceptés</p>
      </div>
      <div className="modal-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <button className="btn-ghost" onClick={onClose}>Retour</button>
        <button className="btn-primary" onClick={() => window.open('https://discord.gg/', '_blank')}>Rejoindre Discord 🎮</button>
      </div>
    </div>
  </div>
);

const Boutique = () => {
  const { products, user } = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [buyingProduct, setBuyingProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { id: 'all', label: 'Tout voir' },
    { id: 'role', label: '🎭 Rôles' },
    { id: 'whitelist', label: '⚔️ Whitelist' },
    { id: 'pack', label: '🌟 Packs' },
    { id: 'boost', label: '👾 Boosts' },
    { id: 'sub', label: '💎 Abonnements' },
  ];

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-bg" />

      <div className="section">
        <div className="container">
          <div className="section-header">
            <h2>🛒 Boutique Shibuya</h2>
            <p>Choisissez parmi nos offres exclusives pour améliorer votre expérience sur le serveur.</p>
            <div className="section-divider" />
          </div>

          {/* Filtres */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilter(cat.id)}
                className={filter === cat.id ? 'btn-primary btn-sm' : 'btn-ghost btn-sm'}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Admin : bouton ajouter */}
          {user?.role === 'Univers' && (
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-gold" onClick={() => setShowAddModal(true)}>
                ➕ Ajouter une offre
              </button>
            </div>
          )}

          <div className="offers-grid">
            {filtered.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <OfferCard product={p} onEdit={setEditingProduct} onBuy={setBuyingProduct} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingProduct && <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)} />}
      {showAddModal && <EditProductModal product={null} onClose={() => setShowAddModal(false)} />}
      {buyingProduct && <BuyModal product={buyingProduct} onClose={() => setBuyingProduct(null)} />}
    </div>
  );
};

export default Boutique;
