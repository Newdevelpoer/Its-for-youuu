import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PhotoGrid from '../components/PhotoGrid';
import PhotoUpload from '../components/PhotoUpload';
import SeasonalEffects from '../components/SeasonalEffects';
import api from '../utils/api';

const seasons = ['monsoon', 'winter', 'autumn', 'spring'];

const seasonConfig = {
  monsoon: {
    name: 'Monsoon',
    emoji: '🌧️',
    bg: 'from-blue-400/20 via-cyan-200/20 to-blue-300/20',
    darkBg: 'from-blue-950 via-blue-900/80 to-cyan-900/60',
    accent: '#89CFF0',
    desc: 'Rain-kissed memories',
    borderColor: 'border-blue-300/40',
    darkBorderColor: 'border-cyan-500/20',
  },
  winter: {
    name: 'Winter',
    emoji: '❄️',
    bg: 'from-sky-200/30 via-white/30 to-indigo-100/30',
    darkBg: 'from-slate-900 via-sky-950/80 to-indigo-950/60',
    accent: '#B0E0E6',
    desc: 'Frosty cozy moments',
    borderColor: 'border-sky-200/40',
    darkBorderColor: 'border-sky-500/20',
  },
  autumn: {
    name: 'Autumn',
    emoji: '🍂',
    bg: 'from-orange-300/20 via-amber-100/20 to-yellow-200/20',
    darkBg: 'from-orange-950 via-amber-900/80 to-yellow-900/60',
    accent: '#E2694C',
    desc: 'Warm golden afternoons',
    borderColor: 'border-orange-300/40',
    darkBorderColor: 'border-orange-500/20',
  },
  spring: {
    name: 'Spring',
    emoji: '🌸',
    bg: 'from-pink-200/30 via-rose-100/20 to-fuchsia-100/20',
    darkBg: 'from-pink-950 via-rose-900/80 to-fuchsia-900/60',
    accent: '#FFB7C5',
    desc: 'Blooming new memories',
    borderColor: 'border-pink-300/40',
    darkBorderColor: 'border-pink-500/20',
  },
};

const GalleryCategory = () => {
  const { category } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = seasonConfig[category];
  const currentIndex = seasons.indexOf(category);
  const prevSeason = currentIndex > 0 ? seasons[currentIndex - 1] : null;
  const nextSeason = currentIndex < seasons.length - 1 ? seasons[currentIndex + 1] : null;

  useEffect(() => {
    if (!config) {
      navigate('/gallery');
      return;
    }
    setLoading(true);
    api.get(`/photos/${category}`)
      .then((res) => setPhotos(res.data))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, [category]);

  const handleUpload = (newPhoto) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  if (!config) return null;

  return (
    <div
      className={`min-h-screen pt-20 relative ${
        theme === 'light'
          ? `bg-gradient-to-br ${config.bg}`
          : `bg-gradient-to-br ${config.darkBg}`
      }`}
    >
      {/* Seasonal particle effects */}
      <SeasonalEffects season={category} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-float">{config.emoji}</div>
          <h1
            className={`font-dancing font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {config.name} Memories
          </h1>
          <p
            className={`font-quicksand text-lg mb-6 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            {config.desc} ✨
          </p>
          {/* Upload button */}
          <PhotoUpload category={category} onUpload={handleUpload} />
        </div>

        {/* Photo Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-5xl animate-spin">✨</div>
          </div>
        ) : (
          <PhotoGrid photos={photos} />
        )}

        {/* Navigation */}
        <div
          className={`flex items-center justify-between py-12 mt-8 border-t ${
            theme === 'light' ? config.borderColor : config.darkBorderColor
          }`}
        >
          {prevSeason ? (
            <Link
              to={`/gallery/${prevSeason}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-white/70 text-gray-700 hover:bg-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              ← {seasonConfig[prevSeason].emoji} {seasonConfig[prevSeason].name}
            </Link>
          ) : (
            <div />
          )}

          <Link
            to="/gallery"
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
              theme === 'light'
                ? 'bg-white/70 text-gray-700 hover:bg-white'
                : 'bg-white/10 text-gray-200 hover:bg-white/20'
            }`}
          >
            🖼️ All Seasons
          </Link>

          {nextSeason ? (
            <Link
              to={`/gallery/${nextSeason}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-white/70 text-gray-700 hover:bg-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              {seasonConfig[nextSeason].emoji} {seasonConfig[nextSeason].name} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCategory;
