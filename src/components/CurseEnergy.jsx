import React from 'react';

const CurseEnergy = () => {
  const particles = [...Array(40)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${3 + Math.random() * 8}s`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 6}px`
  }));

  return (
    <div className="curse-energy">
      {particles.map(p => (
        <div 
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            '--duration': p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default CurseEnergy;
