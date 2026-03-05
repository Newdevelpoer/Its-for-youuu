import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

// ========== Memory Match Game ==========
const CARD_EMOJIS = ['🐼', '🌸', '❤️', '⭐', '🌙', '🦋']
const ALL_CARDS = [...CARD_EMOJIS, ...CARD_EMOJIS]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function MemoryGame({ theme, isDark }) {
  const [cards, setCards] = useState(() =>
    shuffle(ALL_CARDS).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
  )
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [won, setWon] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleFlip = useCallback((id) => {
    if (disabled) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    setCards(newCards)

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setDisabled(true)
      setMoves(m => m + 1)
      const [firstId, secondId] = newFlipped
      const first = newCards.find(c => c.id === firstId)
      const second = newCards.find(c => c.id === secondId)

      if (first.emoji === second.emoji) {
        const matched = newCards.map(c =>
          c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
        )
        setCards(matched)
        setScore(s => s + 1)
        setFlipped([])
        setDisabled(false)
        if (matched.every(c => c.matched)) setWon(true)
      } else {
        setTimeout(() => {
          setCards(c => c.map(card =>
            card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card
          ))
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }, [cards, flipped, disabled])

  const reset = () => {
    setCards(shuffle(ALL_CARDS).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })))
    setFlipped([])
    setMoves(0)
    setScore(0)
    setWon(false)
    setDisabled(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: theme.cardBg, color: theme.text }}>
            Matches: {score}/{CARD_EMOJIS.length}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: theme.cardBg, color: theme.text }}>
            Moves: {moves}
          </span>
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
          style={{ background: isDark ? '#1C82AD' : '#cdb4db', color: '#fff' }}
        >
          🔄 Reset
        </button>
      </div>

      {won && (
        <div className="text-center py-4 mb-4 rounded-2xl animate-pop-in" style={{ background: isDark ? '#03C988' : '#ffafcc' }}>
          <div className="text-3xl font-bold text-white">🎉 You matched them all! 🎉</div>
          <div className="text-white mt-1">Completed in {moves} moves</div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className="aspect-square rounded-2xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 hover:scale-105 select-none"
            style={{
              background: card.flipped || card.matched
                ? (card.matched ? (isDark ? '#03C988' : '#7bf1a8') : theme.cardBg)
                : (isDark ? 'linear-gradient(135deg, #1C82AD, #00337C)' : 'linear-gradient(135deg, #cdb4db, #bde0fe)'),
              border: `2px solid ${theme.border}`,
              boxShadow: card.matched ? '0 0 10px rgba(3,201,136,0.4)' : 'none',
              transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </div>
        ))}
      </div>
    </div>
  )
}

// ========== Catch the Hearts Game ==========
function CatchHeartsGame({ theme, isDark }) {
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [hearts, setHearts] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const intervalRef = useRef(null)
  const speedRef = useRef(3000)
  const idRef = useRef(0)

  const spawnHeart = useCallback(() => {
    const newHeart = {
      id: idRef.current++,
      left: Math.random() * 85,
      duration: speedRef.current,
    }
    setHearts(prev => [...prev, newHeart])
  }, [])

  useEffect(() => {
    if (running && !gameOver) {
      intervalRef.current = setInterval(() => {
        spawnHeart()
        speedRef.current = Math.max(800, speedRef.current - 30)
      }, Math.max(400, speedRef.current * 0.4))
    }
    return () => clearInterval(intervalRef.current)
  }, [running, gameOver, spawnHeart])

  useEffect(() => {
    if (missed >= 5) {
      setGameOver(true)
      setRunning(false)
    }
  }, [missed])

  const catchHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
    setScore(s => s + 1)
  }

  const missHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
    setMissed(m => m + 1)
  }

  const startGame = () => {
    setScore(0)
    setMissed(0)
    setHearts([])
    setGameOver(false)
    speedRef.current = 2500
    idRef.current = 0
    setRunning(true)
  }

  const stopGame = () => {
    setRunning(false)
    clearInterval(intervalRef.current)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: theme.cardBg, color: theme.text }}>
            ❤️ Caught: {score}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: theme.cardBg, color: theme.text }}>
            💔 Missed: {missed}/5
          </span>
        </div>
        {running ? (
          <button
            onClick={stopGame}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: isDark ? '#dd3131' : '#ff6b9d', color: '#fff' }}
          >
            ⏹ Stop
          </button>
        ) : (
          <button
            onClick={startGame}
            className="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
            style={{ background: isDark ? '#03C988' : '#ffafcc', color: '#fff' }}
          >
            ▶ {gameOver ? 'Play Again' : 'Start'}
          </button>
        )}
      </div>

      {gameOver && (
        <div className="text-center py-4 mb-4 rounded-2xl" style={{ background: isDark ? '#dd3131' : '#ffafcc' }}>
          <div className="text-2xl font-bold text-white">Game Over! You caught {score} hearts 💔</div>
        </div>
      )}

      {!running && !gameOver && (
        <div className="text-center py-8" style={{ color: theme.subtext }}>
          <div className="text-5xl mb-3">❤️</div>
          <p>Click Start to catch falling hearts!</p>
          <p className="text-sm mt-1">Don&apos;t let more than 5 escape!</p>
        </div>
      )}

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          height: '350px',
          background: isDark
            ? 'linear-gradient(180deg, #13005A 0%, #00337C 100%)'
            : 'linear-gradient(180deg, #ffc8dd 0%, #bde0fe 100%)',
        }}
      >
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-3xl cursor-pointer select-none hover:scale-125 transition-transform"
            style={{
              left: `${heart.left}%`,
              animation: `rainFall ${heart.duration}ms linear forwards`,
              top: '-40px',
            }}
            onClick={() => catchHeart(heart.id)}
            onAnimationEnd={() => missHeart(heart.id)}
          >
            ❤️
          </div>
        ))}

        {running && hearts.length === 0 && (
          <div className="flex items-center justify-center h-full opacity-30" style={{ color: theme.text }}>
            Hearts incoming...
          </div>
        )}
      </div>
    </div>
  )
}

// ========== Main Games Page ==========
export default function Games() {
  const { theme, isDark } = useTheme()
  const [activeGame, setActiveGame] = useState('memory')

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: theme.text }}>
            Mini Games 🎮
          </h1>
          <p style={{ color: theme.subtext }}>Fun games just for you! ✨</p>
        </div>

        {/* Game Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {[
            { id: 'memory', label: '🧩 Memory Match' },
            { id: 'hearts', label: '❤️ Catch Hearts' },
          ].map(game => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className="px-5 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: activeGame === game.id
                  ? (isDark ? '#1C82AD' : '#cdb4db')
                  : theme.cardBg,
                color: activeGame === game.id ? '#fff' : theme.text,
                border: `2px solid ${activeGame === game.id ? (isDark ? '#1C82AD' : '#cdb4db') : theme.border}`,
              }}
            >
              {game.label}
            </button>
          ))}
        </div>

        {/* Game Container */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: theme.cardBg,
            border: `2px solid ${theme.border}`,
            boxShadow: isDark ? '0 8px 30px rgba(28,130,173,0.2)' : '0 8px 30px rgba(205,180,219,0.3)',
          }}
        >
          {activeGame === 'memory' ? (
            <MemoryGame theme={theme} isDark={isDark} />
          ) : (
            <CatchHeartsGame theme={theme} isDark={isDark} />
          )}
        </div>
      </div>
    </div>
  )
}
