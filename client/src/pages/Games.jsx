import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import MemoryMatch from '../games/MemoryMatch';
import LoveQuiz from '../games/LoveQuiz';

const games = [
  {
    id: 'memory',
    title: 'Memory Match',
    emoji: '🧩',
    desc: 'Flip cards and find matching pairs! Test your memory with cute themed cards.',
    component: MemoryMatch,
  },
  {
    id: 'quiz',
    title: 'Love Quiz',
    emoji: '💌',
    desc: 'Answer fun questions about love and discover your romantic personality!',
    component: LoveQuiz,
  },
];

const Games = () => {
  const { theme } = useTheme();
  const [activeGame, setActiveGame] = useState(null);

  const ActiveComponent = activeGame ? games.find((g) => g.id === activeGame)?.component : null;

  return (
    <div
      className={`min-h-screen pt-20 px-6 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-green/20 via-white to-light-blue2/20'
          : 'bg-gradient-to-br from-dark-navy via-dark-blue1/70 to-dark-blue2/40'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <h1
            className={`font-dancing font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Fun & Games 🎮
          </h1>
          <p className={`font-quicksand text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Take a break and play a little! ✨
          </p>
        </div>

        {!activeGame ? (
          /* Game Selection */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`group p-8 rounded-3xl text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl border ${
                  theme === 'light'
                    ? 'bg-white/70 border-light-purple/20 hover:border-light-purple/60 hover:shadow-light-purple/20'
                    : 'bg-dark-navy/60 border-dark-teal/10 hover:border-dark-teal/40 hover:shadow-dark-teal/20'
                }`}
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce-soft">{game.emoji}</div>
                <h2
                  className={`font-dancing font-bold text-2xl mb-2 ${
                    theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {game.title}
                </h2>
                <p
                  className={`font-quicksand text-sm ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {game.desc}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  Play now →
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Active Game */
          <div>
            <button
              onClick={() => setActiveGame(null)}
              className={`mb-8 flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 ${
                theme === 'light'
                  ? 'bg-white/70 text-gray-600 hover:bg-white'
                  : 'bg-dark-navy/60 text-gray-300 hover:bg-dark-navy'
              }`}
            >
              ← Back to Games
            </button>

            <div
              className={`p-8 rounded-3xl border mb-16 ${
                theme === 'light'
                  ? 'bg-white/70 border-light-purple/20 shadow-xl'
                  : 'bg-dark-navy/60 border-dark-teal/15 shadow-xl'
              }`}
            >
              <h2
                className={`font-dancing font-bold text-3xl mb-6 text-center ${
                  theme === 'light' ? 'text-gray-800' : 'text-white'
                }`}
              >
                {games.find((g) => g.id === activeGame)?.emoji}{' '}
                {games.find((g) => g.id === activeGame)?.title}
              </h2>
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
