import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// June 15 — birthday month (0-indexed) and day
const BIRTHDAY_MONTH = 5
const BIRTHDAY_DAY = 15

function isBirthdayToday() {
  const now = new Date()
  return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY
}

function isWithin30DaysAfterBirthday() {
  const now = new Date()
  const birthday = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY)
  const diff = now - birthday
  return diff > 0 && diff <= 30 * 24 * 60 * 60 * 1000
}

function getNextBirthdayCountdown() {
  const now = new Date()
  const thisYear = now.getFullYear()
  let target = new Date(thisYear, BIRTHDAY_MONTH, BIRTHDAY_DAY)
  if (now > target) target = new Date(thisYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY)
  const diff = target - now
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

const CONFETTI_COLORS = ['#ff6b9d', '#cdb4db', '#bde0fe', '#7bf1a8', '#ffc8dd', '#ffafcc', '#a2d2ff', '#ffd700']

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animation: `confettiFall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s infinite`,
            top: '-20px',
            transform: `rotate(${Math.random() * 360}deg)`,
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
          }}
        />
      ))}
    </div>
  )
}

function Balloon({ left, delay }) {
  return (
    <div
      className="fixed bottom-0 select-none pointer-events-none text-4xl"
      style={{
        left: `${left}%`,
        animation: `balloonFloat 3s ease-in-out ${delay}s infinite`,
        zIndex: 0,
      }}
    >
      🎈
    </div>
  )
}

export default function Surprise() {
  const { theme, isDark } = useTheme()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(getNextBirthdayCountdown)
  const today = isBirthdayToday()
  const after = isWithin30DaysAfterBirthday()
  const showSurprise = today || after

  useEffect(() => {
    if (!showSurprise) {
      const timer = setInterval(() => {
        setCountdown(getNextBirthdayCountdown())
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showSurprise])

  if (!showSurprise) {
    return (
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div
            className="rounded-3xl p-10"
            style={{
              background: theme.cardBg,
              border: `2px solid ${theme.border}`,
              boxShadow: isDark ? '0 8px 30px rgba(28,130,173,0.2)' : '0 8px 30px rgba(205,180,219,0.3)',
            }}
          >
            <div className="text-7xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: theme.text }}>
              A Surprise Awaits
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: theme.subtext }}>
              This page hides a beautiful surprise. You must wait for a magical day. 🔒
            </p>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Min', value: countdown.minutes },
                { label: 'Sec', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-2xl font-bold rounded-xl p-2 mb-1"
                    style={{
                      background: isDark ? 'rgba(28,130,173,0.3)' : 'rgba(205,180,219,0.3)',
                      color: isDark ? '#03C988' : '#7c5cbf',
                    }}
                  >
                    {String(value ?? 0).padStart(2, '0')}
                  </div>
                  <div className="text-xs" style={{ color: theme.subtext }}>{label}</div>
                </div>
              ))}
            </div>

            <p className="text-sm" style={{ color: theme.subtext }}>
              Come back on June 15th for your birthday surprise 🎂
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
              style={{ background: isDark ? '#1C82AD' : '#cdb4db', color: '#fff' }}
            >
              ← Go Back Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10 relative overflow-hidden">
      <Confetti />
      {[10, 25, 40, 55, 70, 85].map((left, i) => (
        <Balloon key={i} left={left} delay={i * 0.5} />
      ))}

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div
          className="rounded-3xl p-8 md:p-12 text-center"
          style={{
            background: theme.cardBg,
            border: `3px solid ${isDark ? '#03C988' : '#ffafcc'}`,
            boxShadow: isDark ? '0 0 40px rgba(3,201,136,0.3)' : '0 0 40px rgba(255,175,204,0.5)',
          }}
        >
          <div className="text-6xl mb-4 animate-bounce">🎂</div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isDark ? '#03C988' : '#ff6b9d' }}
          >
            Happy Birthday! 🎉
          </h1>

          <div className="text-4xl mb-6 space-x-2">
            {'🎈🌸🐼⭐🦋🎊🌻'.split('').map((emoji, i) => (
              <span
                key={i}
                className="inline-block animate-balloon"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <div
            className="rounded-2xl p-6 mb-8 text-left"
            style={{
              background: isDark ? 'rgba(3,201,136,0.1)' : 'rgba(255,200,221,0.3)',
              border: `1px solid ${isDark ? '#03C988' : '#ffafcc'}`,
            }}
          >
            <p className="text-lg leading-relaxed mb-4" style={{ color: theme.text }}>
              🌻 <strong>My dearest Sunflower,</strong>
            </p>
            <p className="leading-relaxed mb-4" style={{ color: theme.subtext, lineHeight: '1.9' }}>
              On this beautiful day that the universe gave us you, I want you to know that every single day with you is a gift. Your smile brightens the cloudiest days, your laughter is music, and your heart is home.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: theme.subtext, lineHeight: '1.9' }}>
              May this year bring you all the magic you deserve — adventures that take your breath away, moments of pure joy, and the quiet happiness of knowing you are endlessly loved. 🌸
            </p>
            <p className="leading-relaxed" style={{ color: theme.subtext, lineHeight: '1.9' }}>
              Here's to you, to us, and to all the beautiful stories yet to be written. Happy Birthday, my wonderful Sunflower. 💫
            </p>
            <p className="mt-4 font-bold" style={{ color: isDark ? '#03C988' : '#ff6b9d' }}>
              With all my heart ❤️
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {['🌸 Your smile', '🐼 Your joy', '❤️ Your heart', '⭐ Your dreams', '🦋 Your spirit', '🌙 Your magic'].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 text-sm font-medium animate-pop-in"
                style={{
                  background: isDark ? 'rgba(28,130,173,0.2)' : 'rgba(205,180,219,0.3)',
                  color: theme.text,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="text-3xl space-x-3">
            {['🎂', '🎁', '🎊', '🎉', '🥂', '🌟'].map((emoji, i) => (
              <span
                key={i}
                className="inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
