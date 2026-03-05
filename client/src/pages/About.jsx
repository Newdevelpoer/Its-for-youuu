import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const STORY_SECTIONS = [
  {
    emoji: '🌱',
    title: 'Where It All Began',
    text: 'There are certain people who enter your life and rearrange everything — not with grand gestures, but with the quiet warmth of their presence. You are one of those rare souls. From the very first moment, there was something in your laugh, your way of seeing the world, that made everything feel lighter.',
  },
  {
    emoji: '🐼',
    title: 'The Little Things',
    text: 'It\'s the tiny moments that create the biggest memories. The way you get excited about pandas 🐼, how your eyes light up at the sight of flowers 🌸, the way you hum softly when you\'re deep in thought. These little details are the brushstrokes that paint someone extraordinary.',
  },
  {
    emoji: '🌸',
    title: 'Your Magic',
    text: 'You carry kindness like it\'s the most natural thing in the world. You notice beauty in places most people walk past. A blooming flower on a city street, the way sunlight filters through leaves, the sound of rain on a quiet afternoon — you see poetry everywhere, and somehow that makes everything around you more beautiful too.',
  },
  {
    emoji: '⭐',
    title: 'What You Mean',
    text: 'Words fall short, but here is an attempt: you are the kind of person who makes the world feel like a warmer, more wonderful place just by being in it. Your laughter is contagious, your heart is generous, and your spirit is endlessly bright. You are, quite simply, irreplaceable.',
  },
  {
    emoji: '🌙',
    title: 'Always & Forever',
    text: 'No matter the season — monsoon or winter, spring or autumn — some things remain constant. This space will always be yours, these memories will always be real, and these words will always be true. Here\'s to every beautiful day that has been, and all the magical ones yet to come. 💫',
  },
]

const FLOATING = ['🐼', '🌸', '❤️', '⭐', '🦋', '🌙', '✨']

export default function About() {
  const { theme, isDark } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const sectionsRef = useRef([])
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx)
            setVisibleSections(prev => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionsRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToSectionsRef = (el, idx) => {
    if (el) sectionsRef.current[idx] = el
  }

  return (
    <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Parallax floating decorations */}
      {FLOATING.map((emoji, i) => (
        <div
          key={i}
          className="fixed text-2xl select-none pointer-events-none opacity-20"
          style={{
            left: `${(i * 14 + 5) % 90}%`,
            top: `${(i * 17 + 5) % 85}%`,
            transform: `translateY(${scrollY * (0.1 + i * 0.03)}px) rotate(${scrollY * 0.05}deg)`,
            transition: 'transform 0.1s ease-out',
            fontSize: `${20 + (i % 3) * 10}px`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="text-5xl mb-4 animate-heartbeat inline-block"
          >
            ❤️
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: theme.text,
              textShadow: isDark ? '0 0 20px rgba(3,201,136,0.4)' : '2px 2px 8px rgba(205,180,219,0.6)',
            }}
          >
            Our Story
          </h1>
          <p className="text-lg" style={{ color: theme.subtext }}>
            A letter written in light and memory ✨
          </p>

          {/* Music Toggle */}
          <button
            onClick={() => setMusicPlaying(!musicPlaying)}
            className="mt-6 flex items-center gap-2 mx-auto px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: musicPlaying
                ? (isDark ? '#03C988' : '#ffafcc')
                : theme.cardBg,
              color: musicPlaying ? '#fff' : theme.subtext,
              border: `1px solid ${theme.border}`,
            }}
          >
            <span>🎵</span>
            <span className="text-sm">{musicPlaying ? 'Music Playing ♪' : 'Play Music'}</span>
          </button>
          {musicPlaying && (
            <p className="text-xs mt-2" style={{ color: theme.subtext }}>
              ♪ Imagine your favourite song playing softly... ♪
            </p>
          )}
        </div>

        {/* Story Sections */}
        {STORY_SECTIONS.map((section, idx) => (
          <div
            key={idx}
            ref={el => addToSectionsRef(el, idx)}
            data-idx={idx}
            className="mb-16 transition-all duration-700"
            style={{
              opacity: visibleSections.has(idx) ? 1 : 0,
              transform: visibleSections.has(idx)
                ? 'translateX(0)'
                : (idx % 2 === 0 ? 'translateX(-60px)' : 'translateX(60px)'),
            }}
          >
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                boxShadow: isDark
                  ? '0 8px 30px rgba(28,130,173,0.15)'
                  : '0 8px 30px rgba(205,180,219,0.3)',
                perspective: '1000px',
                transform: `perspective(1000px) rotateY(${idx % 2 === 0 ? '2deg' : '-2deg'})`,
              }}
            >
              {/* Decorative corner emoji */}
              <div
                className="absolute top-4 right-4 text-3xl opacity-20"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (idx + 1)}px)`,
                }}
              >
                {section.emoji}
              </div>

              <div className="text-4xl mb-4">{section.emoji}</div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: isDark ? '#03C988' : '#7c5cbf' }}
              >
                {section.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: theme.subtext, lineHeight: '1.9' }}
              >
                {section.text}
              </p>
            </div>
          </div>
        ))}

        {/* Closing */}
        <div className="text-center mt-8">
          <div className="text-5xl mb-4">🌻</div>
          <p
            className="text-xl italic"
            style={{ color: theme.subtext }}
          >
            &quot;You are the sunflower in every season of this garden.&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
