import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const elements = ['🐼', '🌸', '🦋', '✨', '💖', '🌺', '🎀', '⭐'];

const FloatingElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;
    Array.from(items).forEach((item, i) => {
      gsap.set(item, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0.3 + Math.random() * 0.4,
        scale: 0.5 + Math.random() * 0.5,
      });

      gsap.to(item, {
        y: `-=${30 + Math.random() * 50}`,
        x: `+=${-20 + Math.random() * 40}`,
        rotation: Math.random() * 360,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, i) => (
        <span
          key={i}
          className="absolute text-2xl md:text-3xl select-none"
          style={{ willChange: 'transform' }}
        >
          {el}
        </span>
      ))}
    </div>
  );
};

export default FloatingElements;
