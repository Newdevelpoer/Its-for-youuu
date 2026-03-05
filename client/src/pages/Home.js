import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { useVisitCounter } from '../hooks/useVisitCounter';
import { getCountdown, isBirthdayPeriod } from '../utils/birthdayUtils';
import FloatingElements from '../components/FloatingElements';

const Home = () => {
  const { isDark } = useTheme();
  const visitCount = useVisitCounter();
  const [countdown, setCountdown] = useState(getCountdown());
  const [isUnlocked] = useState(isBirthdayPeriod());
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.6')
      .fromTo(decorRef.current?.children || [], { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.1
      }, '-=0.5');
  }, []);

  const CountdownUnit = ({ value, label }) => (
    <div className={`flex flex-col items-center px-3 py-2 rounded-xl ${
      isDark ? 'bg-dark-ocean/50' : 'bg-white/60'
    } backdrop-blur-sm`}>
      <span className={`text-2xl md:text-4xl font-display font-bold ${
        isDark ? 'text-dark-green' : 'text-light-pink'
      }`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className={`text-xs uppercase tracking-wider ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-br from-dark-navy via-dark-ocean to-dark-navy'
        : 'bg-gradient-to-br from-light-pink via-light-rose to-light-sky'
    }`}>
      <FloatingElements />

      {/* Visit Counter */}
      <div className={`fixed top-20 right-4 z-30 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
        isDark ? 'bg-dark-teal/30 text-dark-green' : 'bg-light-mint/40 text-gray-700'
      }`}>
        💖 Visits: {visitCount}
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Decorative elements */}
        <div ref={decorRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute top-1/4 left-1/4 text-4xl md:text-6xl animate-float opacity-60">🐼</span>
          <span className="absolute top-1/3 right-1/4 text-3xl md:text-5xl animate-float-slow opacity-50">🌸</span>
          <span className="absolute bottom-1/3 left-1/3 text-3xl md:text-4xl animate-float opacity-40">🦋</span>
          <span className="absolute top-1/2 right-1/3 text-2xl md:text-4xl animate-float-slow opacity-50">✨</span>
          <span className="absolute bottom-1/4 right-1/4 text-3xl md:text-5xl animate-float opacity-60">🌺</span>
        </div>

        <h1
          ref={titleRef}
          className={`font-display text-4xl md:text-7xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}
        >
          Welcome to{' '}
          <span className={`${isDark ? 'text-dark-green' : 'text-light-pink'}`}>
            Your World
          </span>
          {' '}💖
        </h1>

        <p
          ref={subtitleRef}
          className={`text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-body ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          A small digital universe built entirely to celebrate someone incredibly special ✨
        </p>

        {/* Cute character display */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {['🐼', '💝', '🎀', '💝', '🐼'].map((emoji, i) => (
            <span
              key={i}
              className={`text-3xl md:text-5xl animate-bounce-slow`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Birthday Countdown */}
        <div className={`w-full max-w-lg mx-auto p-6 rounded-2xl backdrop-blur-md mb-8 ${
          isDark ? 'bg-dark-ocean/40 border border-dark-teal/30' : 'bg-white/40 border border-light-rose/30'
        }`}>
          <h3 className={`font-display text-lg mb-4 ${isDark ? 'text-dark-green' : 'text-light-pink'}`}>
            🎂 Birthday Countdown
          </h3>
          <div className="flex justify-center gap-3">
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownUnit value={countdown.hours} label="Hours" />
            <CountdownUnit value={countdown.minutes} label="Mins" />
            <CountdownUnit value={countdown.seconds} label="Secs" />
          </div>
        </div>

        {/* Surprise Button */}
        <Link
          to="/surprise"
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-display font-semibold text-lg transition-all duration-500 ${
            isUnlocked
              ? isDark
                ? 'bg-dark-green text-white hover:shadow-lg hover:shadow-dark-green/30 hover:scale-105'
                : 'bg-light-coral text-white hover:shadow-lg hover:shadow-light-coral/30 hover:scale-105'
              : isDark
                ? 'bg-dark-ocean/50 text-gray-500 cursor-not-allowed border border-dark-teal/20'
                : 'bg-gray-200/50 text-gray-400 cursor-not-allowed border border-gray-300/30'
          }`}
        >
          {isUnlocked ? '🎁 Open Your Surprise!' : '🔒 A Surprise Awaits...'}
        </Link>
      </div>
    </div>
  );
};

export default Home;
