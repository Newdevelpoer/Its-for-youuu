import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const emojis = ['🐼', '🌸', '🦋', '💖', '✨', '🎀', '🌺', '⭐'];

const Games = () => {
  const { isDark } = useTheme();
  const [gameMode, setGameMode] = useState(null);

  return (
    <div className={`min-h-screen pt-20 ${
      isDark
        ? 'bg-gradient-to-br from-dark-navy via-dark-ocean to-dark-navy'
        : 'bg-gradient-to-br from-light-mint via-light-sky to-light-blue'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className={`font-display text-4xl md:text-5xl font-bold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          🎮 Fun & Games
        </h1>
        <p className={`text-center text-lg mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Take a break and play something fun!
        </p>

        {!gameMode ? (
          <div className="grid md:grid-cols-2 gap-6">
            <GameCard
              title="Memory Match"
              emoji="🧩"
              description="Match pairs of cute emojis — test your memory!"
              isDark={isDark}
              onClick={() => setGameMode('memory')}
            />
            <GameCard
              title="Catch the Stars"
              emoji="⭐"
              description="Click on falling stars before they disappear!"
              isDark={isDark}
              onClick={() => setGameMode('catch')}
            />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setGameMode(null)}
              className={`mb-6 px-4 py-2 rounded-xl font-medium transition-all ${
                isDark ? 'bg-dark-ocean text-gray-300 hover:bg-dark-teal' : 'bg-white/60 text-gray-600 hover:bg-white'
              }`}
            >
              ← Back to Games
            </button>
            {gameMode === 'memory' && <MemoryGame isDark={isDark} />}
            {gameMode === 'catch' && <CatchGame isDark={isDark} />}
          </div>
        )}
      </div>
    </div>
  );
};

const GameCard = ({ title, emoji, description, isDark, onClick }) => (
  <button
    onClick={onClick}
    className={`p-8 rounded-2xl text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      isDark
        ? 'bg-dark-ocean/60 border border-dark-teal/30 hover:border-dark-green/50'
        : 'bg-white/60 border border-light-rose/30 hover:border-light-pink/50'
    }`}
  >
    <span className="text-5xl mb-4 block">{emoji}</span>
    <h3 className={`font-display text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
      {title}
    </h3>
    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
  </button>
);

// Memory Match Game
const MemoryGame = ({ isDark }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = useCallback(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, isFlipped: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((m) => [...m, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const isComplete = matched.length === cards.length && cards.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Moves: {moves}
        </p>
        <button
          onClick={initializeGame}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isDark ? 'bg-dark-teal text-white' : 'bg-light-coral text-white'
          }`}
        >
          🔄 New Game
        </button>
      </div>

      {isComplete && (
        <div className={`text-center p-6 rounded-2xl mb-6 ${
          isDark ? 'bg-dark-green/20 text-dark-green' : 'bg-light-mint/30 text-green-700'
        }`}>
          <p className="text-2xl font-display font-bold">🎉 You Won!</p>
          <p>Completed in {moves} moves!</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => {
          const isFlippedCard = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
                isFlippedCard
                  ? isDark
                    ? 'bg-dark-teal/50 scale-95'
                    : 'bg-light-rose/50 scale-95'
                  : isDark
                    ? 'bg-dark-ocean hover:bg-dark-ocean/80 hover:scale-105'
                    : 'bg-white/70 hover:bg-white hover:scale-105'
              } ${matched.includes(card.id) ? 'opacity-60' : ''}`}
            >
              {isFlippedCard ? card.emoji : '❓'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Catch the Stars Game
const CatchGame = ({ isDark }) => {
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startGame = () => {
    setScore(0);
    setStars([]);
    setTimeLeft(30);
    setGameActive(true);
  };

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const spawner = setInterval(() => {
      const newStar = {
        id: Date.now() + Math.random(),
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 70,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 1 + Math.random(),
      };
      setStars((prev) => [...prev.slice(-15), newStar]);

      // Auto-remove after 2 seconds
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 2000);
    }, 600);

    return () => clearInterval(spawner);
  }, [gameActive]);

  const catchStar = (id) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Score: {score} | Time: {timeLeft}s
        </p>
        <button
          onClick={startGame}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isDark ? 'bg-dark-teal text-white' : 'bg-light-coral text-white'
          }`}
        >
          {gameActive ? '🔄 Restart' : '▶️ Start'}
        </button>
      </div>

      {!gameActive && timeLeft === 0 && (
        <div className={`text-center p-6 rounded-2xl mb-6 ${
          isDark ? 'bg-dark-green/20 text-dark-green' : 'bg-light-mint/30 text-green-700'
        }`}>
          <p className="text-2xl font-display font-bold">⏰ Time's Up!</p>
          <p>You caught {score} stars! 🌟</p>
        </div>
      )}

      <div className={`relative rounded-2xl overflow-hidden ${
        isDark ? 'bg-dark-ocean/50' : 'bg-white/50'
      }`} style={{ height: '400px' }}>
        {!gameActive && timeLeft === 30 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className={`text-xl font-display ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Click Start to begin! ⭐
            </p>
          </div>
        )}
        {stars.map((star) => (
          <button
            key={star.id}
            onClick={() => catchStar(star.id)}
            className="absolute transition-all duration-200 hover:scale-150 animate-pulse cursor-pointer"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size * 1.5}rem`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {star.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Games;
