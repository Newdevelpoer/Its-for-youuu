import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import VisitCounter from '../components/VisitCounter';
import BirthdayCountdown from '../components/BirthdayCountdown';
import LockedButton from '../components/LockedButton';
import FloatingElements from '../components/FloatingElements';

const BIRTHDAY_DATE = import.meta.env.VITE_BIRTHDAY_DATE || '2024-08-15';

const Home = () => {
  const { theme } = useTheme();
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Simple entrance animations
    const elements = [headlineRef.current, subtitleRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 200);
    });
  }, []);

  return (
    <div
      className={`min-h-screen relative ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-purple/30 via-light-pink1/20 to-light-blue1/30'
          : 'bg-gradient-to-br from-dark-navy via-dark-blue1/80 to-dark-blue2/50'
      }`}
    >
      <FloatingElements />
      <VisitCounter />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Panda illustration */}
        <div className="text-8xl mb-4 animate-bounce-soft">🐼</div>

        {/* Main headline */}
        <div ref={headlineRef}>
          <h1
            className={`text-center font-dancing font-bold leading-tight mb-4 ${
              theme === 'light'
                ? 'text-gray-800'
                : 'text-white'
            }`}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Welcome to Your World{' '}
            <span style={{ display: 'inline-block' }} className="animate-wiggle">✨</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <p
            className={`text-center font-quicksand text-lg md:text-xl max-w-2xl mb-8 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            A small digital universe built entirely to celebrate someone special —{' '}
            <span className={`font-semibold ${theme === 'light' ? 'text-pink-500' : 'text-dark-teal'}`}>
              you. 💖
            </span>
          </p>
        </div>

        {/* Decorative hearts row */}
        <div className="flex gap-4 mb-8 text-2xl">
          {['🌸', '💫', '🌺', '⭐', '🦋'].map((emoji, i) => (
            <span
              key={i}
              className="float-1 opacity-70"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="/gallery"
            onClick={(e) => { e.preventDefault(); window.location.href = '/gallery'; }}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              theme === 'light'
                ? 'bg-gradient-to-r from-light-purple to-light-pink2 text-gray-700 hover:shadow-light-purple/50'
                : 'bg-gradient-to-r from-dark-teal to-dark-blue2 text-white hover:shadow-dark-teal/50'
            }`}
          >
            🖼️ View Gallery
          </a>
          <a
            href="/about"
            onClick={(e) => { e.preventDefault(); window.location.href = '/about'; }}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 ${
              theme === 'light'
                ? 'border-light-purple/60 text-gray-700 hover:bg-light-purple/20'
                : 'border-dark-teal/60 text-gray-200 hover:bg-dark-teal/10'
            }`}
          >
            💫 Our Story
          </a>
        </div>

        {/* Bottom section: Countdown + Locked button */}
        <div
          className={`w-full max-w-xl rounded-3xl p-8 glass border ${
            theme === 'light'
              ? 'bg-white/60 border-light-purple/30'
              : 'bg-dark-navy/60 border-dark-teal/20'
          }`}
        >
          <BirthdayCountdown targetDate={BIRTHDAY_DATE} />
          <div className="mt-6 flex justify-center">
            <LockedButton />
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h2
          className={`text-center font-dancing text-3xl md:text-4xl font-bold mb-12 ${
            theme === 'light' ? 'text-gray-700' : 'text-white'
          }`}
        >
          What&apos;s Inside ✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🖼️',
              title: 'Memory Gallery',
              desc: 'Four seasonal galleries filled with your most precious memories',
              href: '/gallery',
            },
            {
              icon: '💫',
              title: 'Our Story',
              desc: 'A scrolling love story with parallax effects and music',
              href: '/about',
            },
            {
              icon: '🎮',
              title: 'Fun Games',
              desc: 'Memory match and love quiz — playful & cute',
              href: '/games',
            },
            {
              icon: '🎁',
              title: 'Special Surprise',
              desc: 'Locked until your birthday. Something magical awaits...',
              href: '/surprise',
            },
            {
              icon: '🌸',
              title: 'Seasonal Themes',
              desc: 'Monsoon rain, winter snow, spring petals, autumn leaves',
              href: '/gallery',
            },
            {
              icon: '🎂',
              title: 'Birthday Countdown',
              desc: 'Counting down every second to your special day',
              href: '/',
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className={`group block p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                theme === 'light'
                  ? 'bg-white/70 border-light-purple/20 hover:border-light-purple/60 hover:shadow-light-purple/30'
                  : 'bg-dark-navy/60 border-dark-teal/10 hover:border-dark-teal/40 hover:shadow-dark-teal/20'
              }`}
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-soft">{card.icon}</div>
              <h3
                className={`font-poppins font-semibold text-lg mb-2 ${
                  theme === 'light' ? 'text-gray-800' : 'text-white'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`font-quicksand text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {card.desc}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`relative z-10 text-center py-8 font-dancing text-lg ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Made with 💖 just for you ✨
      </footer>
    </div>
  );
};

export default Home;
