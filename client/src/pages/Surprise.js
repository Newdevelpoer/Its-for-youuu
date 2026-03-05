import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { isBirthdayPeriod } from '../utils/birthdayUtils';

const Surprise = () => {
  const { isDark } = useTheme();
  const isUnlocked = isBirthdayPeriod();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
      });
    }
  }, []);

  if (!isUnlocked) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${
        isDark
          ? 'bg-gradient-to-br from-dark-navy via-dark-ocean to-dark-navy'
          : 'bg-gradient-to-br from-light-pink via-light-rose to-light-sky'
      }`}>
        <div ref={containerRef} className={`max-w-lg mx-auto p-10 rounded-3xl text-center backdrop-blur-md ${
          isDark ? 'bg-dark-ocean/50 border border-dark-teal/30' : 'bg-white/50 border border-light-rose/30'
        }`}>
          <div className="text-6xl mb-6">🔒</div>
          <h1 className={`font-display text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            A Beautiful Surprise Awaits
          </h1>
          <p className={`text-lg leading-relaxed font-body mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            This page hides a beautiful surprise.<br />
            You must wait for a magical day. ✨
          </p>
          <div className="flex justify-center gap-2 text-3xl">
            {['🎁', '💖', '🎂', '💖', '🎁'].map((e, i) => (
              <span key={i} className="animate-bounce-slow" style={{ animationDelay: `${i * 0.2}s` }}>
                {e}
              </span>
            ))}
          </div>
          <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            The lock will open on a very special day 🗝️
          </p>
        </div>
      </div>
    );
  }

  // Birthday celebration mode
  return (
    <div className={`min-h-screen pt-20 relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-br from-dark-navy via-purple-900 to-dark-navy'
        : 'bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200'
    }`}>
      {/* Confetti-like floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['🎉', '🎊', '🎂', '🎈', '💖', '✨', '🎁', '🌟'][i % 8]}
          </span>
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="text-7xl mb-6">🎂</div>
        <h1 className={`font-display text-4xl md:text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Happy Birthday! 🎉
        </h1>
        <p className={`text-xl md:text-2xl font-body mb-8 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Today is your special day, and this entire digital world celebrates YOU! 💖
        </p>

        <div className={`p-8 rounded-3xl backdrop-blur-md mb-8 ${
          isDark ? 'bg-dark-ocean/50 border border-purple-500/30' : 'bg-white/50 border border-pink-300/30'
        }`}>
          <p className={`text-lg leading-relaxed font-body ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Every memory we have shared, every laugh, every moment — they all led to this day. 
            You make the world more beautiful just by being in it. 
            This little corner of the internet is dedicated to celebrating everything you are. 
            Happy Birthday, beautiful soul! 🌸
          </p>
        </div>

        <div className="flex justify-center gap-4 text-5xl">
          {['🎈', '🎂', '🎁', '🎂', '🎈'].map((e, i) => (
            <span key={i} className="animate-bounce-slow" style={{ animationDelay: `${i * 0.15}s` }}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Surprise;
