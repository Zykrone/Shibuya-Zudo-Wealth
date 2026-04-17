import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user, getAllUsers, updateUserRole, products, deleteProduct } = useAuth();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => { setUsers(getAllUsers()); }, [activeTab]);

  if (user?.role !== 'Univers') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫</div>
          <h2>Accès Refusé</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Seul l'Univers peut accéder à ce panneau.</p>
        </div>
      </div>
    );
  }

  const roleBadge = (role) => {
    if (role === 'Univers') return <span className="badge badge-univers">👑 Univers</span>;
    if (role === 'modo') return <span className="badge badge-modo">🛡️ Modo</span>;
    return <span className="badge badge-user">👤 User</span>;
  };

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole);
    setUsers(getAllUsers());
  };

  const adminTabs = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '🛒', label: 'Produits' },
    { id: 'users', icon: '👥', label: 'Utilisateurs' },
  ];

  return (
    <div className="admin-layout">
      <div className="page-bg" />
      <aside className="admin-sidebar">
        <p className="admin-sidebar-title">Panel Admin</p>
        {adminTabs.map(tab => (
          <button key={tab.id} className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </aside>

      <div className="admin-content" style={{ position: 'relative', zIndex: 1 }}>
        {activeTab === 'dashboard' && (
          <>
            <div className="admin-header">
              <h1>📊 Dashboard</h1>
              <p>Vue d'ensemble de votre plateforme Shibuya Invest.</p>
            </div>
            <div className="admin-stats">
              <div className="admin-stat">
                <div className="admin-stat-value" style={{ color: 'var(--accent-light)' }}>{products.length}</div>
                <div className="admin-stat-label">Produits actifs</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-value" style={{ color: 'var(--success)' }}>{users.length}</div>
                <div className="admin-stat-label">Membres inscrits</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-value" style={{ color: 'var(--accent-gold)' }}>
                  {products.reduce((acc, p) => acc + p.price, 0).toFixed(0)}€
                </div>
                <div className="admin-stat-label">Valeur catalogue</div>
              </div>
              <div className="admin-stat">
                <div className="admin-stat-value" style={{ color: 'var(--danger)' }}>{products.filter(p => p.featured).length}</div>
                <div className="admin-stat-label">Offres en vedette</div>
              </div>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '16px' }}>
              <h3 style={{ color: 'var(--accent-gold-light)', marginBottom: '0.5rem' }}>👑 Bienvenue, Univers</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Vous disposez de tous les pouvoirs sur cette plateforme. Gérez vos produits et votre communauté depuis ce panneau.</p>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <>
            <div className="admin-header">
              <h1>🛒 Gestion des Produits</h1>
              <p>Modifier, supprimer ou mettre en avant vos offres.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(product => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{product.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{product.name} {product.featured && '⭐'}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{product.desc.substring(0, 80)}...</div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-light)', whiteSpace: 'nowrap' }}>{product.price}€</div>
                  <button className="btn-danger btn-sm" onClick={() => { if(window.confirm('Supprimer ?')) deleteProduct(product.id); }}>
                    🗑️ Supprimer
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <>
            <div className="admin-header">
              <h1>👥 Gestion Utilisateurs</h1>
              <p>Gérez les rôles et permissions des membres inscrits.</p>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Rôle actuel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="user-avatar">{u.username[0]?.toUpperCase()}</div>
                        <span>{u.username}</span>
                        {u.id === user.id && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Vous)</span>}
                      </div>
                    </td>
                    <td>{roleBadge(u.role)}</td>
                    <td>
                      {u.id !== user.id && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-ghost btn-sm" onClick={() => handleRoleChange(u.id, 'modo')}>Passer Modo</button>
                          <button className="btn-ghost btn-sm" onClick={() => handleRoleChange(u.id, 'user')}>Remettre User</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
