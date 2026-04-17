import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Base de données simulée (localStorage)
const DB_KEY = 'shibuya_invest_db';

const getDB = () => {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) return { users: [], products: INITIAL_PRODUCTS };
  return JSON.parse(raw);
};

const saveDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

const INITIAL_PRODUCTS = [
  {
    id: 1, icon: '🎭', name: 'Rôle VIP', category: 'role',
    price: 9.99, featured: false, badge: 'popular',
    desc: 'Accès aux salons VIP, couleur exclusive sur le serveur, et priorité sur les événements.',
    perks: ['Accès aux salons VIP', 'Couleur exclusive', 'Priorité événements', 'Badge Discord'],
  },
  {
    id: 2, icon: '⚔️', name: 'Whitelist Shibuya', category: 'whitelist',
    price: 14.99, featured: true, badge: 'exclusive',
    desc: 'Accès complet en whitelist au serveur RP Shibuya avec toutes les fonctionnalités premium.',
    perks: ['Accès serveur complet', 'Personnage réservé', 'Support prioritaire', 'Avantages RP exclusifs'],
  },
  {
    id: 3, icon: '🌟', name: 'Pack Elite', category: 'pack',
    price: 24.99, priceOld: 34.99, featured: false, badge: 'new',
    desc: 'Le pack complet : VIP + Whitelist + accès à tous les événements privés du serveur.',
    perks: ['Tout le Rôle VIP', 'Whitelist incluse', 'Événements privés', 'Grade exclusif'],
  },
  {
    id: 4, icon: '🏆', name: 'Donateur', category: 'role',
    price: 4.99, featured: false, badge: null,
    desc: 'Montrez votre soutien au serveur avec le grade Donateur et ses petits avantages.',
    perks: ['Grade Donateur', 'Accès salon dons', 'Remerciements serveur'],
  },
  {
    id: 5, icon: '👾', name: 'Boost Serveur', category: 'boost',
    price: 7.99, featured: false, badge: null,
    desc: 'Boost Discord + grade associé + accès aux salons réservés aux boosters.',
    perks: ['Boost automatique', 'Grade Booster', 'Salons exclusifs', 'Emoji personnalisé'],
  },
  {
    id: 6, icon: '💎', name: 'Abonnement Mensuel', category: 'sub',
    price: 19.99, featured: false, badge: 'popular',
    desc: 'Abonnement mensuel reconductible avec tous les avantages mis à jour automatiquement.',
    perks: ['Renouvellement auto', 'Tous les rôles actifs', 'Support dédié', 'Accès bêta features'],
  },
];

const ROLES_DATA = [
  { id: 1, name: 'Univers', color: '#f59e0b', perms: ['Full Admin', 'Gestion Site', 'Config Serveur', 'Banissement', 'Mute', 'Kick'], price: '—' },
  { id: 2, name: 'Gérant', color: '#7c3aed', perms: ['Gestion membres', 'Tickets', 'Annonces', 'Modération avancée'], price: '—' },
  { id: 3, name: 'Modérateur', color: '#6366f1', perms: ['Mute', 'Kick', 'Gestion tickets', 'Avertissements'], price: '—' },
  { id: 4, name: 'VIP', color: '#a78bfa', perms: ['Salon VIP', 'Couleur exclusive', 'Priorité events'], price: '9.99€' },
  { id: 5, name: 'Whitelist', color: '#10b981', perms: ['Accès serveur RP', 'Personnage réservé', 'Support priori'], price: '14.99€' },
  { id: 6, name: 'Donateur', color: '#f59e0b', perms: ['Grade donateur', 'Salon dons'], price: '4.99€' },
  { id: 7, name: 'Booster', color: '#ec4899', perms: ['Boost serveur', 'Emoji custom', 'Salon boosters'], price: '7.99€' },
  { id: 8, name: 'Membre', color: '#64748b', perms: ['Accès basique', 'Salons publics'], price: 'Gratuit' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDB();
    setProducts(db.products);

    const savedUser = localStorage.getItem('shibuya_invest_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const db = getDB();
    const found = db.users.find(u => u.username === username && u.password === password);
    if (!found) return { success: false, error: 'Identifiants incorrects' };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('shibuya_invest_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const register = (username, password) => {
    const db = getDB();
    if (db.users.find(u => u.username === username)) return { success: false, error: 'Ce pseudo existe déjà' };
    const role = db.users.length === 0 ? 'Univers' : 'user';
    const newUser = { id: Date.now(), username, password, role };
    db.users.push(newUser);
    saveDB(db);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('shibuya_invest_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shibuya_invest_user');
  };

  const updateProduct = (updatedProduct) => {
    const db = getDB();
    db.products = db.products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    saveDB(db);
    setProducts(db.products);
  };

  const addProduct = (product) => {
    const db = getDB();
    const newProduct = { ...product, id: Date.now() };
    db.products = [...db.products, newProduct];
    saveDB(db);
    setProducts(db.products);
  };

  const deleteProduct = (id) => {
    const db = getDB();
    db.products = db.products.filter(p => p.id !== id);
    saveDB(db);
    setProducts(db.products);
  };

  const getAllUsers = () => {
    const db = getDB();
    return db.users.map(({ password: _, ...u }) => u);
  };

  const updateUserRole = (userId, newRole) => {
    const db = getDB();
    db.users = db.users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    saveDB(db);
  };

  return (
    <AuthContext.Provider value={{
      user, products, loading, roles: ROLES_DATA,
      login, register, logout,
      updateProduct, addProduct, deleteProduct,
      getAllUsers, updateUserRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
