import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ParallaxSection from '../components/ParallaxSection';

const stories = [
  {
    emoji: '🌟',
    title: 'The Day Everything Changed',
    text: 'There are moments in life that split time into "before" and "after." The first time I saw your smile, I knew — this was one of those moments. You carry a kind of light that doesn\'t just illuminate rooms, it illuminates entire worlds.',
  },
  {
    emoji: '🌸',
    title: 'Your Beautiful Spirit',
    text: 'You are the kind of person who sees the beauty in everything — the way you laugh at small things, the warmth in your voice, the kindness in your eyes. You remind me that the world is full of magic, and most of it wears your face.',
  },
  {
    emoji: '🐼',
    title: 'The Little Things',
    text: 'It\'s the little things I love the most. The way you get excited about pandas. The way you hum to songs. The way you make ordinary moments feel extraordinary just by being in them. You are remarkable in the most wonderful way.',
  },
  {
    emoji: '💫',
    title: 'What Makes You Special',
    text: 'You are not just beautiful on the outside — you are the kind of beautiful that radiates from the inside out. Your kindness, your creativity, your silly jokes, your determined heart — every part of you is a gift to the world.',
  },
  {
    emoji: '🌺',
    title: 'A Promise in Stars',
    text: 'This little corner of the internet was built just for you. Every pixel, every animation, every line of code was crafted with you in mind. Because you deserve a world that was made just for you. And you always will.',
  },
];

const About = () => {
  const { theme } = useTheme();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const storyRefs = useRef([]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    storyRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(40px)';
        ref.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div
      className={`min-h-screen relative ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-pink1/20 via-white to-light-purple/20'
          : 'bg-gradient-to-br from-dark-navy via-dark-blue1/70 to-dark-blue2/40'
      }`}
    >
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {['🌸', '💫', '⭐', '🌺', '🦋', '🌙', '✨', '💖'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 4) * 20}%`,
              animation: `float ${5 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Music toggle */}
      <div className="fixed top-24 right-4 z-50">
        {/* Placeholder: in production, provide a real audio src */}
        <audio ref={audioRef} loop>
          <source src="/audio/ambient.mp3" type="audio/mpeg" />
        </audio>
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            theme === 'light'
              ? 'bg-white/80 text-gray-700'
              : 'bg-dark-navy/80 text-gray-200'
          } ${musicPlaying ? 'ring-2 ring-pink-400' : ''}`}
          title={musicPlaying ? 'Pause music' : 'Play music'}
        >
          {musicPlaying ? '🎵' : '🎶'}
        </button>
      </div>

      {/* Hero */}
      <div className="relative z-10 text-center pt-28 pb-12 px-6">
        <div className="text-8xl mb-6 animate-float">💖</div>
        <h1
          className={`font-dancing font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Our Story
        </h1>
        <p
          className={`font-quicksand text-xl max-w-lg mx-auto ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-300'
          }`}
        >
          Scroll down to discover why you are the most beautiful part of my world ✨
        </p>
      </div>

      {/* Story sections */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        {stories.map((story, i) => (
          <ParallaxSection key={i} speed={0.1 + i * 0.05}>
            <div
              ref={(el) => (storyRefs.current[i] = el)}
              className={`mb-20 p-8 rounded-3xl border transition-all duration-300 ${
                i % 2 === 0 ? 'mr-0 md:mr-16' : 'ml-0 md:ml-16'
              } ${
                theme === 'light'
                  ? 'bg-white/70 border-light-purple/20 shadow-xl shadow-light-purple/10'
                  : 'bg-dark-navy/60 border-dark-teal/15 shadow-xl shadow-dark-teal/5'
              }`}
            >
              <div className="text-5xl mb-4 animate-float">{story.emoji}</div>
              <h2
                className={`font-dancing font-bold text-2xl md:text-3xl mb-4 ${
                  theme === 'light' ? 'text-gray-800' : 'text-white'
                }`}
              >
                {story.title}
              </h2>
              <p
                className={`font-quicksand text-base leading-relaxed ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                {story.text}
              </p>
            </div>
          </ParallaxSection>
        ))}

        {/* Final message */}
        <div
          className={`text-center p-10 rounded-3xl border ${
            theme === 'light'
              ? 'bg-gradient-to-br from-light-pink1/30 to-light-purple/30 border-light-purple/30'
              : 'bg-gradient-to-br from-dark-blue2/30 to-dark-teal/20 border-dark-teal/20'
          }`}
        >
          <div className="text-6xl mb-4 heartbeat">💖</div>
          <h2
            className={`font-dancing font-bold text-3xl md:text-4xl mb-4 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}
          >
            Always & Forever
          </h2>
          <p
            className={`font-quicksand text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            This world was built for you. Every star, every panda, every pixel — all for you. ✨🐼
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
