import { useRef, useEffect } from 'react';

const ParallaxSection = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
      const offset = (scrolled - 0.5) * speed * 100;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-bg ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;
