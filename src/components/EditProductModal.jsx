import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const EditProductModal = ({ product, onClose }) => {
  const { updateProduct, addProduct } = useAuth();
  const isNew = !product?.id;

  const [form, setForm] = useState(product || {
    icon: '⭐', name: '', price: '', priceOld: '',
    desc: '', perks: [''], badge: null, featured: false, category: 'role'
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  
  const handlePerkChange = (i, value) => {
    const perks = [...(form.perks || [])];
    perks[i] = value;
    setForm(prev => ({ ...prev, perks }));
  };
  
  const addPerk = () => setForm(prev => ({ ...prev, perks: [...(prev.perks || []), ''] }));
  const removePerk = (i) => setForm(prev => ({ ...prev, perks: prev.perks.filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    if (!form.name || !form.price) return alert('Nom et prix requis');
    const cleaned = { ...form, price: parseFloat(form.price), priceOld: form.priceOld ? parseFloat(form.priceOld) : undefined, perks: form.perks.filter(Boolean) };
    if (isNew) addProduct(cleaned);
    else updateProduct(cleaned);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h3>{isNew ? '➕ Nouvelle Offre' : '✏️ Modifier l\'Offre'}</h3>
        <p>Modifiez les informations de ce produit en temps réel.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ gridColumn: '1/-1' }}>
            <label className="form-label">Icône (emoji)</label>
            <input className="form-input" value={form.icon} onChange={e => handleChange('icon', e.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: '1/-1' }}>
            <label className="form-label">Nom de l'offre</label>
            <input className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Ex: Rôle VIP" />
          </div>
          <div className="form-group">
            <label className="form-label">Prix (€)</label>
            <input type="number" className="form-input" value={form.price} onChange={e => handleChange('price', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Ancien prix (€) - optionnel</label>
            <input type="number" className="form-input" value={form.priceOld || ''} onChange={e => handleChange('priceOld', e.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: '1/-1' }}>
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} value={form.desc} onChange={e => handleChange('desc', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Badge</label>
            <select className="form-input" value={form.badge || ''} onChange={e => handleChange('badge', e.target.value || null)}>
              <option value="">Aucun</option>
              <option value="popular">Populaire</option>
              <option value="exclusive">Exclusif</option>
              <option value="new">Nouveau</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label className="form-label" style={{ margin: 0 }}>⭐ Mise en avant</label>
            <input type="checkbox" checked={form.featured} onChange={e => handleChange('featured', e.target.checked)} style={{ width: 18, height: 18 }} />
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label className="form-label">Avantages inclus</label>
          {form.perks?.map((perk, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input className="form-input" value={perk} onChange={e => handlePerkChange(i, e.target.value)} placeholder={`Avantage ${i + 1}`} />
              <button className="btn-danger btn-sm" onClick={() => removePerk(i)}>✕</button>
            </div>
          ))}
          <button className="btn-ghost btn-sm" onClick={addPerk} style={{ marginTop: '0.5rem' }}>+ Ajouter</button>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSave}>💾 Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
