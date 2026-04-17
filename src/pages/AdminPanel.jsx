import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDiscount } from '../context/DiscountContext';

const AdminPanel = () => {
  const { user, getAllUsers, updateUserRole, products, deleteProduct } = useAuth();
  const { isSecretAdmin, discounts, toggleDiscount } = useDiscount();
  const [activeTab, setActiveTab] = React.useState(isSecretAdmin && user?.role !== 'Univers' ? 'reductions' : 'dashboard');
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => { setUsers(getAllUsers()); }, [activeTab]);

  if (user?.role !== 'Univers' && !isSecretAdmin) {
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
    ...(user?.role === 'Univers' ? [
      { id: 'dashboard', icon: '📊', label: 'Dashboard' },
      { id: 'products', icon: '🛒', label: 'Produits' },
      { id: 'users', icon: '👥', label: 'Utilisateurs' },
    ] : []),
    { id: 'reductions', icon: '🏷️', label: 'Réductions' }
  ];

  return (
    <div className="admin-page-wrapper">
      <div className="page-bg" />
      
      <div className="admin-glass-container-luxe">
        <header className="admin-header-modern">
          <div className="admin-brand-wrap">
            <div className="admin-neon-orb" />
            <div className="admin-titles">
              <h1>SYSTEM <span className="text-cyan">OVERRIDE</span></h1>
              <p>PANEL D'ADMINISTRATION SUPRÊME</p>
            </div>
          </div>
          
          <nav className="admin-tabs-modern">
            {adminTabs.map(tab => (
              <button 
                key={tab.id} 
                className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <div className="tab-indicator" />
              </button>
            ))}
          </nav>
        </header>

        <main className="admin-glass-content">
          {activeTab === 'dashboard' && (
            <div className="glass-module fade-in">
              <div className="module-header">
                <h2>📊 VUE D'ENSEMBLE</h2>
                <p>Statistiques globales de Shibuya Zudo.</p>
              </div>
              <div className="glass-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="glass-stat-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="stat-val" style={{ color: 'var(--cyan)', fontSize: '2.5rem', fontWeight: 900 }}>{products.length}</div>
                  <div className="stat-lab" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>PRODUITS</div>
                </div>
                <div className="glass-stat-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="stat-val" style={{ color: 'var(--violet-light)', fontSize: '2.5rem', fontWeight: 900 }}>{users.length}</div>
                  <div className="stat-lab" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>MEMBRES</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="glass-module fade-in">
              <div className="module-header">
                <h2>🛒 GESTION DES PRODUITS</h2>
                <p>Modifier, supprimer ou mettre en avant vos offres.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map(product => (
                  <div key={product.id} className="switch-item" style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                    <span style={{ fontSize: '2rem' }}>{product.icon}</span>
                    <div style={{ flex: 1, marginLeft: '1.5rem' }}>
                      <div style={{ fontWeight: 800 }}>{product.name} {product.featured && '⭐'}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{product.desc.substring(0, 80)}...</div>
                    </div>
                    <div style={{ fontWeight: 900, color: 'var(--cyan)', marginRight: '2rem' }}>{product.price}€</div>
                    <button className="btn-danger btn-sm" style={{ padding: '0.5rem', borderRadius: '8px' }} onClick={() => { if(window.confirm('Supprimer ?')) deleteProduct(product.id); }}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-module fade-in">
              <div className="module-header">
                <h2>👥 GESTION UTILISATEURS</h2>
                <p>Gérez les rôles et permissions des membres.</p>
              </div>
              <div className="glass-table-wrap" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th style={{ textAlign: 'left', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>UTILISATEUR</th>
                      <th style={{ textAlign: 'left', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>RÔLE</th>
                      <th style={{ textAlign: 'right', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '35px', height: '35px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{u.username[0]?.toUpperCase()}</div>
                            <span style={{ fontWeight: 700 }}>{u.username} {user && u.id === user.id && '(Vous)'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1.5rem' }}>{roleBadge(u.role)}</td>
                        <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                          {user && u.id !== user.id && (
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button className="btn-ghost btn-sm" onClick={() => handleRoleChange(u.id, 'modo')}>Modo</button>
                              <button className="btn-ghost btn-sm" onClick={() => handleRoleChange(u.id, 'user')}>User</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reductions' && (
            <div className="glass-module fade-in">
              <div className="module-header">
                <h2>🏷️ GESTION DES RÉDUCTIONS</h2>
                <p>Configuration des privilèges financiers de Shibuya Zudo.</p>
              </div>
              
              <div className="reductions-grid">
                <div className="reduction-glass-card">
                  <h3>🎭 RÔLES</h3>
                  <div className="switch-list">
                    <div className="switch-item">
                      <div className="switch-info">
                        <span className="switch-title">-20% GLOBAL</span>
                        <span className="switch-sub">Sauf Couronne/Créateur</span>
                      </div>
                      <label className="neon-switch">
                        <input type="checkbox" checked={discounts.globalRole} onChange={() => toggleDiscount('globalRole')} />
                        <span className="neon-slider"></span>
                      </label>
                    </div>
                    <div className="switch-item">
                      <div className="switch-info">
                        <span className="switch-title">👑 COURONNE</span>
                        <span className="switch-sub">-15% appliqué</span>
                      </div>
                      <label className="neon-switch purple">
                        <input type="checkbox" checked={discounts.couronneRole} onChange={() => toggleDiscount('couronneRole')} />
                        <span className="neon-slider"></span>
                      </label>
                    </div>
                    <div className="switch-item">
                      <div className="switch-info">
                        <span className="switch-title">✨ CRÉATEUR</span>
                        <span className="switch-sub">-10% appliqué</span>
                      </div>
                      <label className="neon-switch gold">
                        <input type="checkbox" checked={discounts.createurRole} onChange={() => toggleDiscount('createurRole')} />
                        <span className="neon-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="reduction-glass-card">
                  <h3>⚔️ WHITELIST</h3>
                  <div className="switch-list">
                    <div className="switch-item">
                      <div className="switch-info">
                        <span className="switch-title">OWNER</span>
                        <span className="switch-sub">-15% sur packs Owner</span>
                      </div>
                      <label className="neon-switch cyan">
                        <input type="checkbox" checked={discounts.ownerWl} onChange={() => toggleDiscount('ownerWl')} />
                        <span className="neon-slider"></span>
                      </label>
                    </div>
                    <div className="switch-item">
                      <div className="switch-info">
                        <span className="switch-title">SYS</span>
                        <span className="switch-sub">-10% sur packs Sys</span>
                      </div>
                      <label className="neon-switch">
                        <input type="checkbox" checked={discounts.sysWl} onChange={() => toggleDiscount('sysWl')} />
                        <span className="neon-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
