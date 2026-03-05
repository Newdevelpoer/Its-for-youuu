import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const storySegments = [
  {
    emoji: '🌟',
    title: 'The Beginning',
    text: 'Every beautiful story has a beginning, and ours started with a single moment that changed everything. From the very first glance, something magical sparked to life.',
  },
  {
    emoji: '🌸',
    title: 'Why You Are Beautiful',
    text: 'Beauty is not just what meets the eye — it is the warmth in your smile, the kindness in your heart, and the light you bring into every room. You are beautiful in ways that words can barely describe.',
  },
  {
    emoji: '💖',
    title: 'Why You Are Adorable',
    text: 'The way you laugh, the way you care about the smallest things, the way your eyes light up when you talk about something you love — everything about you is absolutely adorable.',
  },
  {
    emoji: '✨',
    title: 'Why You Are Special',
    text: 'In a world of billions, there is only one you. Your uniqueness, your strength, your gentleness — they make you irreplaceable. You are not just special to the world, you are the world to someone.',
  },
  {
    emoji: '🦋',
    title: 'Your Strength',
    text: 'Like a butterfly emerging from its cocoon, you have shown incredible strength through every challenge. Your resilience is inspiring, your courage is admirable.',
  },
  {
    emoji: '🌈',
    title: 'Forever & Always',
    text: 'This digital world exists as a testament — a small piece of infinity dedicated to celebrating you. Every pixel, every animation, every word here is for you, always.',
  },
];

const floatingDecorations = ['🐼', '🌸', '🎀', '✨', '💖', '🌺', '🦋', '⭐', '🐼', '🌸'];

const About = () => {
  const { isDark } = useTheme();
  const sectionsRef = useRef([]);
  const decorRef = useRef(null);

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      gsap.fromTo(section, 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax decorations
    if (decorRef.current) {
      Array.from(decorRef.current.children).forEach((child, i) => {
        gsap.to(child, {
          y: -100 - i * 20,
          scrollTrigger: {
            trigger: decorRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className={`min-h-screen pt-20 relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-dark-navy via-dark-ocean to-dark-navy'
        : 'bg-gradient-to-b from-light-sky via-light-rose to-light-pink'
    }`}>
      {/* Floating Decorations */}
      <div ref={decorRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingDecorations.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl md:text-4xl opacity-20 animate-float"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${5 + (i * 12) % 90}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className={`font-display text-4xl md:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            A Story About{' '}
            <span className={isDark ? 'text-dark-green' : 'text-light-pink'}>You</span>
            {' '}💝
          </h1>
          <p className={`text-lg md:text-xl font-body ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Scroll down to discover why you are so incredibly special
          </p>
          <div className="mt-6 animate-bounce text-3xl">↓</div>
        </div>

        {/* Story Segments */}
        <div className="space-y-24">
          {storySegments.map((segment, i) => (
            <div
              key={i}
              ref={(el) => (sectionsRef.current[i] = el)}
              className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-md ${
                isDark
                  ? 'bg-dark-ocean/40 border border-dark-teal/20'
                  : 'bg-white/40 border border-light-rose/20'
              } ${i % 2 === 0 ? 'ml-0 mr-0 md:mr-12' : 'ml-0 md:ml-12 mr-0'}`}
            >
              {/* Decorative emoji */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl">
                {segment.emoji}
              </div>

              <h2 className={`font-display text-2xl md:text-3xl font-bold mt-4 mb-4 ${
                isDark ? 'text-dark-green' : 'text-light-pink'
              }`}>
                {segment.title}
              </h2>
              <p className={`text-lg leading-relaxed font-body ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {segment.text}
              </p>

              {/* Small panda decoration */}
              <span className="absolute -bottom-3 right-4 text-2xl opacity-40">
                {i % 2 === 0 ? '🐼' : '🌸'}
              </span>
            </div>
          ))}
        </div>

        {/* Final message */}
        <div className="text-center mt-24 mb-16">
          <p className={`font-display text-2xl md:text-3xl font-bold ${
            isDark ? 'text-dark-green' : 'text-light-pink'
          }`}>
            You are loved beyond measure 💖
          </p>
          <div className="flex justify-center gap-3 mt-6 text-3xl">
            {['🐼', '💖', '🌸', '💖', '🐼'].map((e, i) => (
              <span key={i} className="animate-bounce-slow" style={{ animationDelay: `${i * 0.15}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
