import React from 'react';

const CurseEnergy = () => {
  const particles = [...Array(15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${5 + Math.random() * 10}s`,
    delay: `${Math.random() * 5}s`,
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
