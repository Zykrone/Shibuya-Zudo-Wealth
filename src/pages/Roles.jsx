import React from 'react';
import { ROLES } from '../data';
import RoleCard from '../components/RoleCard';

const RolesPage = () => {
  // On affiche tous les rôles qui ont un prix (les rôles achetables) dans un flux unique
  const accessibleRoles = ROLES.filter(r => r.price);

  return (
    <div className="page-wrapper" style={{ paddingTop: '140px' }}>
      <div className="page-bg" />
      <div className="container">
        {/* Header Simplifié */}
        <div className="page-hero" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div className="hero-eyebrow" style={{ animationDelay: '0s' }}>
            <span>⚔️</span> AUTORITÉ & PRIVILÈGES
          </div>
          <h1 style={{ fontSize: '5rem', textTransform: 'uppercase', letterSpacing: '-2px', fontWeight: 950, margin: '1rem 0' }}>
            Catalogue des <span style={{ color: 'var(--cyan)' }}>Rôles</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Découvrez l'ensemble de la hiérarchie Shibuya Zudo Wealth. 
            Chaque rang débloque des commandes système et des accès exclusifs.
          </p>
        </div>

        {/* Grille Unique sans catégories pour plus de clarté */}
        <div className="roles-grid" style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '3rem', marginBottom: '8rem' 
        }}>
          {accessibleRoles.map((role, i) => (
            <RoleCard key={role.id} role={role} delay={i * 0.05} />
          ))}
        </div>

        {/* Recap Tableau Poli */}
        <div style={{ marginTop: '10rem', paddingBottom: '10rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Grades <span style={{ color: 'var(--violet-light)' }}>Investissement</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Récapitulatif des coûts uniques d'acquisition.</p>
          </div>

          <div className="price-table-wrap">
            <table className="price-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Grade Élite</th>
                  <th>Autorité</th>
                  <th>Coût Unique</th>
                </tr>
              </thead>
              <tbody>
                {accessibleRoles.map(role => (
                  <tr key={role.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: role.permColor, boxShadow: `0 0 15px ${role.permColor}` }} />
                        <span style={{ fontWeight: 800, color: '#fff' }}>{role.emoji} {role.name}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ 
                        background: 'rgba(124, 58, 237, 0.1)', color: 'var(--violet-light)', 
                        padding: '0.4rem 1rem', borderRadius: '10px', fontSize: '0.7rem', 
                        fontWeight: 900, border: '1px solid rgba(124, 58, 237, 0.2)'
                      }}>
                        NIVEAU {role.perm}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 900, fontSize: '1.3rem' }}>{role.price} €</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: '4rem' }} />
      </div>
    </div>
  );
};

export default RolesPage;
