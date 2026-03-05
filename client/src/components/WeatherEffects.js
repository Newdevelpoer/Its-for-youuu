import React, { useEffect, useRef } from 'react';

const WeatherEffects = ({ type }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let animationId;

    const createParticles = () => {
      const count = type === 'rain' ? 150 : type === 'snow' ? 100 : 60;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: type === 'rain' ? 1 + Math.random() * 2 : 2 + Math.random() * 4,
          speed: type === 'rain' ? 8 + Math.random() * 4 : type === 'snow' ? 1 + Math.random() * 2 : 1 + Math.random() * 1.5,
          wind: type === 'leaves' ? -1 + Math.random() * 2 : type === 'snow' ? Math.sin(i) * 0.5 : 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          opacity: 0.3 + Math.random() * 0.5,
        });
      }
    };

    const drawRain = (p) => {
      ctx.strokeStyle = `rgba(174, 194, 224, ${p.opacity})`;
      ctx.lineWidth = p.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.wind, p.y + p.speed * 2);
      ctx.stroke();
    };

    const drawSnow = (p) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawLeaf = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const colors = ['rgba(210, 105, 30, ', 'rgba(255, 165, 0, ', 'rgba(139, 69, 19, '];
      ctx.fillStyle = colors[Math.floor(p.size) % 3] + `${p.opacity})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        switch (type) {
          case 'rain': drawRain(p); break;
          case 'snow': drawSnow(p); break;
          case 'petals': drawPetal(p); break;
          case 'leaves': drawLeaf(p); break;
          default: break;
        }

        p.y += p.speed;
        p.x += p.wind;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });

      animationId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ willChange: 'transform' }}
    />
  );
};

export default WeatherEffects;
