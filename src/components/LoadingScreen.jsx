import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">⚡</div>
        <div className="loading-text">SHIBUYA ZUDO</div>
        <div className="loading-bar-container">
          <div className="loading-bar-fill" />
        </div>
        <div className="loading-status">Synchronisation de l'Empire...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
