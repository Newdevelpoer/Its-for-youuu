import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const EMOJIS = ['🐼', '🌸', '💖', '🦋', '⭐', '🌺', '🎀', '🍀'];
const CARDS = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const MemoryMatch = () => {
  const { theme } = useTheme();
  const [cards, setCards] = useState(() => shuffle(CARDS));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const handleFlip = (id) => {
    if (disabled) return;
    if (flipped.length === 1 && flipped[0] === id) return;
    const card = cards.find((c) => c.id === id);
    if (card.flipped || card.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);

    if (flipped.length === 0) {
      setFlipped([id]);
    } else {
      setMoves((m) => m + 1);
      setDisabled(true);
      const firstCard = newCards.find((c) => c.id === flipped[0]);
      const secondCard = newCards.find((c) => c.id === id);

      if (firstCard.emoji === secondCard.emoji) {
        const matched = newCards.map((c) =>
          c.id === flipped[0] || c.id === id ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlipped([]);
        setDisabled(false);
        if (matched.every((c) => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === flipped[0] || c.id === id ? { ...c, flipped: false } : c))
          );
          setFlipped([]);
          setDisabled(false);
        }, 900);
      }
    }
  };

  const reset = () => {
    setCards(shuffle(CARDS));
    setFlipped([]);
    setMoves(0);
    setDisabled(false);
    setWon(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className={`font-quicksand text-sm font-semibold px-4 py-2 rounded-full ${
          theme === 'light' ? 'bg-light-purple/30 text-gray-700' : 'bg-dark-teal/20 text-dark-teal'
        }`}>
          Moves: {moves}
        </div>
        <button
          onClick={reset}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
            theme === 'light'
              ? 'bg-light-pink2/40 hover:bg-light-pink2/70 text-gray-700'
              : 'bg-dark-blue2/40 hover:bg-dark-blue2/70 text-white'
          }`}
        >
          🔄 Reset
        </button>
      </div>

      {won && (
        <div className={`text-center p-6 rounded-2xl mb-6 ${
          theme === 'light' ? 'bg-light-green/30' : 'bg-dark-teal/20'
        }`}>
          <div className="text-4xl mb-2">🎉</div>
          <p className={`font-dancing text-2xl font-bold ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            You won in {moves} moves! ✨
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
              card.flipped || card.matched
                ? theme === 'light'
                  ? 'bg-white shadow-lg border-2 border-light-purple/30'
                  : 'bg-dark-blue1 shadow-lg border-2 border-dark-teal/30'
                : theme === 'light'
                ? 'bg-light-purple/30 hover:bg-light-purple/50 border-2 border-light-purple/20'
                : 'bg-dark-blue1/60 hover:bg-dark-blue1 border-2 border-dark-blue2/30'
            } ${card.matched ? 'opacity-60 scale-95' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '✨'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
