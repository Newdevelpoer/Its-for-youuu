import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const SeasonalEffects = ({ season }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const createParticle = () => {
      if (season === 'monsoon') {
        return {
          x: Math.random() * canvas.width,
          y: -10,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 8 + 4,
          alpha: Math.random() * 0.5 + 0.3,
          length: Math.random() * 15 + 5,
          type: 'rain',
        };
      } else if (season === 'winter') {
        return {
          x: Math.random() * canvas.width,
          y: -10,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          size: Math.random() * 4 + 2,
          rotation: Math.random() * Math.PI * 2,
          type: 'snow',
        };
      } else if (season === 'spring') {
        const colors = ['#ffb7c5', '#ff9eb5', '#ffd4de', '#ffafcc', '#ffc8dd'];
        return {
          x: Math.random() * canvas.width,
          y: -10,
          vx: Math.random() * 3 - 1.5,
          vy: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          size: Math.random() * 6 + 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: 'petal',
        };
      } else if (season === 'autumn') {
        const colors = ['#E2694C', '#D4541A', '#CC8B3A', '#C7913B', '#8B4513'];
        return {
          x: Math.random() * canvas.width,
          y: -10,
          vx: Math.random() * 3 - 1.5,
          vy: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          size: Math.random() * 8 + 4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: 'leaf',
        };
      }
    };

    const maxParticles = season === 'monsoon' ? 120 : season === 'winter' ? 80 : 50;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < maxParticles && Math.random() < 0.3) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === 'rain') {
          ctx.strokeStyle = '#89CFF0';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.length);
          ctx.stroke();
        } else if (p.type === 'snow') {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          p.rotation += 0.02;
        } else if (p.type === 'petal') {
          p.rotation += p.rotationSpeed;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'leaf') {
          p.rotation += p.rotationSpeed;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 1.8, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (p.y > canvas.height + 20 || p.x < -50 || p.x > canvas.width + 50) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [season]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default SeasonalEffects;
