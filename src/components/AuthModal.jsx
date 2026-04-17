import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    const result = isLogin ? login(username, password) : register(username, password);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-modal">
        <h2>{isLogin ? '🌌 Connexion' : '⚔️ Rejoindre l\'Ordre'}</h2>
        <p>{isLogin ? 'Accédez à votre espace membre Shibuya.' : 'Créez votre compte pour accéder à la boutique.'}</p>
        
        {error && <p className="form-error">⚠️ {error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Pseudo Discord</label>
            <input type="text" className="form-input" placeholder="VotreNom" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
        
        <div className="auth-switch">
          {isLogin ? "Pas encore membre ? " : "Déjà membre ? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
