import React, { useEffect, useRef } from 'react';

const CursedEnergyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const maxParticles = 80;
    const mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor(x, y, isMouseFollower = false) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height + (isMouseFollower ? 0 : 50);
        this.size = Math.random() * 6 + 2;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = -(Math.random() * 1.5 + 0.5); // Always drift upwards
        this.color = Math.random() > 0.4 ? 'rgba(124, 58, 237, ' : 'rgba(6, 182, 212, '; // Purple vs Cyan
        this.alpha = Math.random() * 0.5 + 0.1;
        this.decay = Math.random() * 0.005 + 0.002;
        this.isMouseFollower = isMouseFollower;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;

        // Interactive mouse gravity/aura
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            // Subtle pull towards cursor for a swirling aura effect
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 1.2;
            this.y += (dy / distance) * force * 0.8;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Create glowing radial gradient for a mystical cursed energy aura
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color + this.alpha + ')');
        gradient.addColorStop(0.5, this.color + (this.alpha * 0.4) + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.fillStyle = gradient;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color.includes('124') ? '#7c3aed' : '#06b6d4';
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < maxParticles / 2; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add a drift of random dark ambient energy particles
      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(new Particle(Math.random() * width, height + 10));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.alpha <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Spawn extra particles near cursor on movement
      if (Math.random() < 0.4) {
        particles.push(
          new Particle(
            mouse.x + (Math.random() - 0.5) * 30,
            mouse.y + (Math.random() - 0.5) * 30,
            true
          )
        );
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.75,
      }}
    />
  );
};

export default CursedEnergyBackground;
