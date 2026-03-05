import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const FloatingElements = () => {
  const { theme } = useTheme();

  const elements = [
    { emoji: '🐼', size: 'text-3xl', pos: 'top-20 left-[8%]', delay: '0s', duration: '6s' },
    { emoji: '🌸', size: 'text-2xl', pos: 'top-32 right-[12%]', delay: '1s', duration: '7s' },
    { emoji: '⭐', size: 'text-xl', pos: 'top-48 left-[20%]', delay: '2s', duration: '5s' },
    { emoji: '🌺', size: 'text-2xl', pos: 'top-64 right-[25%]', delay: '0.5s', duration: '8s' },
    { emoji: '💫', size: 'text-xl', pos: 'top-16 left-[40%]', delay: '1.5s', duration: '6s' },
    { emoji: '🦋', size: 'text-2xl', pos: 'top-80 left-[5%]', delay: '3s', duration: '7s' },
    { emoji: '🌙', size: 'text-2xl', pos: 'top-24 right-[40%]', delay: '2.5s', duration: '9s' },
    { emoji: '🌟', size: 'text-lg', pos: 'top-56 right-[8%]', delay: '4s', duration: '5s' },
    { emoji: '🐼', size: 'text-xl', pos: 'top-96 right-[18%]', delay: '1.8s', duration: '6.5s' },
    { emoji: '🌷', size: 'text-2xl', pos: 'top-72 left-[30%]', delay: '0.8s', duration: '7.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {elements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.size} ${el.pos} opacity-40 select-none`}
          style={{
            animation: `float ${el.duration} ease-in-out infinite ${el.delay}`,
            filter: theme === 'dark' ? 'brightness(0.7) saturate(1.5)' : 'none',
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
