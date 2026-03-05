import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const seasons = [
  {
    id: 'monsoon',
    name: 'Monsoon',
    emoji: '🌧️',
    desc: 'Rain-drenched memories and rainbow moments',
    gradient: 'from-blue-400/40 to-cyan-300/40',
    darkGradient: 'from-blue-900/40 to-cyan-800/30',
    color: '#89CFF0',
  },
  {
    id: 'winter',
    name: 'Winter',
    emoji: '❄️',
    desc: 'Cozy frost-kissed moments together',
    gradient: 'from-sky-200/40 to-indigo-200/40',
    darkGradient: 'from-sky-900/40 to-indigo-900/30',
    color: '#B0E0E6',
  },
  {
    id: 'autumn',
    name: 'Autumn',
    emoji: '🍂',
    desc: 'Warm amber and golden leaf afternoons',
    gradient: 'from-orange-300/40 to-amber-200/40',
    darkGradient: 'from-orange-900/40 to-amber-800/30',
    color: '#E2694C',
  },
  {
    id: 'spring',
    name: 'Spring',
    emoji: '🌸',
    desc: 'Blooming flowers and fresh new beginnings',
    gradient: 'from-pink-300/40 to-rose-200/40',
    darkGradient: 'from-pink-900/40 to-rose-800/30',
    color: '#FFB7C5',
  },
];

const Gallery = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 px-6 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-blue1/20 via-white to-light-purple/20'
          : 'bg-gradient-to-br from-dark-navy to-dark-blue1/60'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <h1
            className={`font-dancing font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Memory Gallery 🖼️
          </h1>
          <p
            className={`font-quicksand text-lg max-w-xl mx-auto ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Four seasons, four chapters of our story. Pick one to explore. ✨
          </p>
        </div>

        {/* Season Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16">
          {seasons.map((season) => (
            <Link
              key={season.id}
              to={`/gallery/${season.id}`}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-400 hover:scale-[1.03] hover:shadow-2xl border ${
                theme === 'light'
                  ? `bg-gradient-to-br ${season.gradient} border-white/60 hover:border-white/80`
                  : `bg-gradient-to-br ${season.darkGradient} border-white/10 hover:border-white/20`
              }`}
            >
              <div className="relative z-10">
                <div className="text-6xl mb-4 group-hover:animate-bounce-soft">{season.emoji}</div>
                <h2
                  className={`font-dancing font-bold text-3xl mb-2 ${
                    theme === 'light' ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {season.name}
                </h2>
                <p
                  className={`font-quicksand text-sm mb-4 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  {season.desc}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Explore →
                </span>
              </div>
              {/* Decorative background circle */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: season.color }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
