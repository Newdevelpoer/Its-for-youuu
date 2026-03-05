import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const FLOATING_EMOJIS = ['🐼', '🌸', '⭐', '🦋', '🌙', '💫', '🌺', '✨', '🐼', '🌸']

// June 15 — birthday month (0-indexed) and day
const BIRTHDAY_MONTH = 5
const BIRTHDAY_DAY = 15

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false,
      })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function getNextBirthday() {
  const now = new Date()
  const thisYear = now.getFullYear()
  const birthday = new Date(thisYear, BIRTHDAY_MONTH, BIRTHDAY_DAY)
  if (now > birthday) {
    return new Date(thisYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY)
  }
  return birthday
}

function isBirthday() {
  const now = new Date()
  return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY
}

export default function Home() {
  const { theme, isDark } = useTheme()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef([])
  const [visitCount, setVisitCount] = useState(0)
  const birthday = isBirthday()
  const countdown = useCountdown(getNextBirthday())

  // Visit counter
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits/increment', { method: 'POST' })
        const data = await res.json()
        setVisitCount(data.count)
      } catch {
        const stored = parseInt(localStorage.getItem('visitCount') || '0') + 1
        localStorage.setItem('visitCount', stored.toString())
        setVisitCount(stored)
      }
    }
    fetchVisits()
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -60, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(cardsRef.current,
      { opacity: 0, y: 60, stagger: 0.15 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      '-=0.4'
    )

    return () => tl.kill()
  }, [])

  const handleSurpriseClick = () => {
    if (birthday) {
      navigate('/surprise')
    }
  }

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 relative overflow-hidden" ref={heroRef}>
      {/* Floating background emojis */}
      {FLOATING_EMOJIS.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-2xl md:text-3xl select-none pointer-events-none opacity-40"
          style={{
            left: `${(i * 11) % 95}%`,
            top: `${(i * 13 + 10) % 80}%`,
            animation: `floatEmoji ${4 + (i % 3)}s ease-in-out ${i * 0.5}s infinite`,
            animationFillMode: 'both',
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Main title */}
        <div ref={titleRef} className="mb-6">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            style={{
              color: theme.text,
              textShadow: isDark ? '0 0 30px rgba(3,201,136,0.5)' : '2px 2px 8px rgba(205,180,219,0.8)',
            }}
          >
            Welcome to Your World,<br />
            <span style={{ color: isDark ? '#03C988' : '#ffafcc' }}>Sunflower 🌻</span>
          </h1>
        </div>

        <div ref={subtitleRef}>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: theme.subtext }}
          >
            A little universe built just for you — filled with memories, magic, and moments that matter. ✨
          </p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { emoji: '🖼️', title: 'Gallery', desc: 'Seasonal memories across the year', path: '/gallery' },
            { emoji: '💌', title: 'Our Story', desc: 'Why you make everything brighter', path: '/about' },
            { emoji: '🎮', title: 'Games', desc: 'Fun mini-games just for you', path: '/games' },
          ].map(({ emoji, title, desc, path }, i) => (
            <div
              key={i}
              ref={addToCardsRef}
              onClick={() => navigate(path)}
              className="p-6 rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl"
              style={{
                background: theme.cardBg,
                border: `2px solid ${theme.border}`,
                boxShadow: isDark ? '0 4px 20px rgba(28,130,173,0.2)' : '0 4px 20px rgba(205,180,219,0.4)',
              }}
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>{title}</h3>
              <p className="text-sm" style={{ color: theme.subtext }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Birthday Countdown */}
        <div
          ref={addToCardsRef}
          className="rounded-3xl p-6 mb-8"
          style={{
            background: theme.cardBg,
            border: `2px solid ${theme.border}`,
            boxShadow: isDark ? '0 4px 20px rgba(28,130,173,0.2)' : '0 4px 20px rgba(255,175,204,0.4)',
          }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
            🎂 Birthday Countdown
          </h2>
          {birthday ? (
            <p className="text-2xl font-bold animate-heartbeat" style={{ color: isDark ? '#03C988' : '#ff6b9d' }}>
              🎉 Happy Birthday! Today is your special day! 🎉
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-3xl md:text-4xl font-bold rounded-2xl p-3 mb-1"
                    style={{
                      background: isDark ? 'rgba(28,130,173,0.3)' : 'rgba(205,180,219,0.3)',
                      color: isDark ? '#03C988' : '#7c5cbf',
                    }}
                  >
                    {String(value ?? 0).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-medium" style={{ color: theme.subtext }}>{label}</div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-sm" style={{ color: theme.subtext }}>
            Until June 15th 🌸
          </p>
        </div>

        {/* Surprise Button */}
        <div ref={addToCardsRef} className="mb-8">
          <button
            onClick={handleSurpriseClick}
            className="px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 relative overflow-hidden group"
            style={{
              background: birthday
                ? (isDark ? 'linear-gradient(135deg, #03C988, #1C82AD)' : 'linear-gradient(135deg, #ff6b9d, #ffafcc)')
                : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
              color: birthday ? '#fff' : theme.subtext,
              border: `2px solid ${birthday ? 'transparent' : theme.border}`,
              cursor: birthday ? 'pointer' : 'not-allowed',
            }}
          >
            {birthday ? (
              <>✨ Open Your Surprise! ✨</>
            ) : (
              <>🔒 Unlock on Your Special Day (June 15)</>
            )}
          </button>
          {!birthday && (
            <p className="mt-2 text-sm" style={{ color: theme.subtext }}>
              Something magical waits for you on June 15th 🎁
            </p>
          )}
        </div>
      </div>

      {/* Visit Counter */}
      <div
        className="fixed bottom-4 left-4 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md z-50"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          color: theme.subtext,
        }}
      >
        👀 {visitCount} visit{visitCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
