import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';

const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 1,
      color: ['#ffc8dd', '#cdb4db', '#a2d2ff', '#7bf1a8', '#ffafcc', '#03C988'][Math.floor(Math.random() * 6)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

const Surprise = () => {
  const { theme } = useTheme();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/surprise/status')
      .then((res) => setStatus(res.data))
      .catch(() => setStatus({ unlocked: false, message: '🔒 A magical surprise awaits...' }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-spin">✨</div>
      </div>
    );
  }

  if (status?.unlocked) {
    return (
      <div
        className={`min-h-screen relative overflow-hidden ${
          theme === 'light'
            ? 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100'
            : 'bg-gradient-to-br from-dark-navy via-dark-blue1 to-dark-blue2'
        }`}
      >
        <Confetti />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          {/* Fireworks */}
          <div className="text-8xl mb-6 animate-bounce-soft">🎆</div>

          <h1
            className={`font-dancing font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Happy Birthday! 🎂
          </h1>

          <p
            className={`font-quicksand text-xl max-w-2xl mb-8 leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            {status.message}
          </p>

          {/* Birthday card */}
          <div
            className={`max-w-lg w-full p-8 rounded-3xl border-2 mb-8 ${
              theme === 'light'
                ? 'bg-white/80 border-pink-300/60 shadow-2xl shadow-pink-200/50'
                : 'bg-dark-navy/80 border-dark-teal/40 shadow-2xl shadow-dark-teal/20'
            }`}
          >
            <div className="text-5xl mb-4">🎉🐼🎉</div>
            <h2
              className={`font-dancing font-bold text-2xl mb-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-white'
              }`}
            >
              A message for you ✨
            </h2>
            <p
              className={`font-quicksand text-base leading-relaxed ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}
            >
              Today is your day, and this entire world was built to celebrate you.
              You are extraordinary in every way — your laughter, your kindness,
              your spirit. On this special day, I want you to feel as magical as you truly are.
              Happy Birthday, beautiful soul! 💖✨
            </p>
          </div>

          {/* Emoji row */}
          <div className="flex gap-4 text-4xl">
            {['🎂', '🎁', '🌸', '✨', '🎊', '💖', '🌟', '🎈'].map((emoji, i) => (
              <span
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${3 + i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Locked state
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative px-6 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-purple/20 via-white to-light-blue1/20'
          : 'bg-gradient-to-br from-dark-navy via-dark-blue1/70 to-dark-blue2/40'
      }`}
    >
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['✨', '💫', '⭐', '🌟'].map((e, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + (i % 3) * 25}%`,
              animation: `float ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
            }}
          >
            {e}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Animated lock */}
        <div
          className={`text-8xl mb-6 ${theme === 'light' ? '' : ''}`}
          style={{ animation: 'float 4s ease-in-out infinite' }}
        >
          🔒
        </div>

        <h1
          className={`font-dancing font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          A Surprise Awaits ✨
        </h1>

        <p
          className={`font-quicksand text-lg mb-6 leading-relaxed ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}
        >
          {status?.message || 'This page hides a beautiful surprise. You must wait for a magical day. ✨🔒'}
        </p>

        {status?.daysUntilBirthday > 0 && (
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${
              theme === 'light'
                ? 'bg-light-purple/20 border-light-purple/40 text-gray-700'
                : 'bg-dark-teal/10 border-dark-teal/30 text-gray-200'
            }`}
          >
            <span className="text-2xl heartbeat">💖</span>
            <span className="font-quicksand font-semibold">
              {status.daysUntilBirthday} days until the magic unlocks
            </span>
          </div>
        )}

        {/* Stars */}
        <div className="flex justify-center gap-3 text-2xl mt-8">
          {['🌟', '✨', '💫', '⭐', '🌟'].map((star, i) => (
            <span
              key={i}
              className="animate-pulse-soft"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {star}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Surprise;
