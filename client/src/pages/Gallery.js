import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import WeatherEffects from '../components/WeatherEffects';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const seasons = [
  {
    id: 'monsoon',
    name: 'Monsoon',
    emoji: '🌧️',
    weather: 'rain',
    gradient: 'from-blue-400/20 via-indigo-300/20 to-purple-400/20',
    darkGradient: 'from-blue-900/30 via-indigo-900/30 to-purple-900/30',
    description: 'Memories washed in gentle rain',
  },
  {
    id: 'winter',
    name: 'Winter',
    emoji: '❄️',
    weather: 'snow',
    gradient: 'from-cyan-200/20 via-blue-200/20 to-white/20',
    darkGradient: 'from-cyan-900/30 via-blue-900/30 to-slate-900/30',
    description: 'Frozen moments of warmth',
  },
  {
    id: 'spring',
    name: 'Spring',
    emoji: '🌸',
    weather: 'petals',
    gradient: 'from-pink-200/20 via-rose-200/20 to-amber-100/20',
    darkGradient: 'from-pink-900/30 via-rose-900/30 to-amber-900/30',
    description: 'Blooming with beautiful memories',
  },
  {
    id: 'autumn',
    name: 'Autumn',
    emoji: '🍂',
    weather: 'leaves',
    gradient: 'from-orange-200/20 via-amber-200/20 to-red-200/20',
    darkGradient: 'from-orange-900/30 via-amber-900/30 to-red-900/30',
    description: 'Warm, cozy recollections',
  },
];

const placeholderPhotos = [
  { id: 1, url: '', color: 'bg-pink-200 dark:bg-pink-900/50' },
  { id: 2, url: '', color: 'bg-blue-200 dark:bg-blue-900/50' },
  { id: 3, url: '', color: 'bg-purple-200 dark:bg-purple-900/50' },
  { id: 4, url: '', color: 'bg-green-200 dark:bg-green-900/50' },
  { id: 5, url: '', color: 'bg-yellow-200 dark:bg-yellow-900/50' },
  { id: 6, url: '', color: 'bg-red-200 dark:bg-red-900/50' },
];

const Gallery = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, token } = useAuth();
  const [currentSeason, setCurrentSeason] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const fileInputRef = useRef(null);

  const season = seasons[currentSeason];

  useEffect(() => {
    fetchPhotos(season.id);
  }, [season.id]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, { y: 40, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3
      });
    }
  }, [currentSeason]);

  const fetchPhotos = async (category) => {
    try {
      const res = await fetch(`${API_URL}/photos/${category}`);
      const data = await res.json();
      setPhotos(data);
    } catch {
      setPhotos([]);
    }
  };

  const handleSeasonChange = (index) => {
    if (index === currentSeason || transitioning) return;
    setTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSeason(index);
        setTransitioning(false);
      }
    });

    tl.to(gridRef.current, { opacity: 0, y: 30, duration: 0.5, ease: 'power2.in' })
      .to(headerRef.current, { opacity: 0, y: -20, duration: 0.3 }, '-=0.3');
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !isAuthenticated) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await fetch(`${API_URL}/photos/${season.id}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        fetchPhotos(season.id);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const goNext = () => handleSeasonChange((currentSeason + 1) % seasons.length);
  const goPrev = () => handleSeasonChange((currentSeason - 1 + seasons.length) % seasons.length);

  return (
    <div className={`min-h-screen pt-20 relative overflow-hidden transition-all duration-700 ${
      isDark
        ? `bg-gradient-to-br from-dark-navy via-dark-ocean to-dark-navy`
        : `bg-gradient-to-br from-light-pink via-light-rose to-light-sky`
    }`}>
      <WeatherEffects type={season.weather} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Season Header */}
        <div ref={headerRef} className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {seasons.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSeasonChange(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === currentSeason
                    ? isDark
                      ? 'bg-dark-teal text-white shadow-lg'
                      : 'bg-light-coral text-white shadow-lg'
                    : isDark
                      ? 'bg-dark-ocean/50 text-gray-400 hover:bg-dark-ocean'
                      : 'bg-white/50 text-gray-500 hover:bg-white/80'
                }`}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>

          <h1 className={`font-display text-4xl md:text-5xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {season.emoji} {season.name} Memories
          </h1>
          <p className={`text-lg font-body ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {season.description}
          </p>
        </div>

        {/* Upload Button */}
        {isAuthenticated && (
          <div className="text-center mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-dark-green/80 text-white hover:bg-dark-green hover:shadow-lg'
                  : 'bg-light-mint text-gray-800 hover:shadow-lg hover:scale-105'
              } ${uploading ? 'opacity-50 cursor-wait' : ''}`}
            >
              {uploading ? '📤 Uploading...' : `📷 Add to ${season.name}`}
            </button>
          </div>
        )}

        {/* Photo Grid */}
        <div
          ref={gridRef}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {photos.length > 0
            ? photos.map((photo) => (
                <div
                  key={photo._id}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={photo.url}
                    alt={photo.originalName}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              ))
            : placeholderPhotos.map((p) => (
                <div
                  key={p.id}
                  className={`break-inside-avoid rounded-xl overflow-hidden shadow-lg ${p.color}`}
                  style={{ height: `${150 + Math.random() * 150}px` }}
                >
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <span className="text-4xl">{season.emoji}</span>
                  </div>
                </div>
              ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12 pb-8">
          <button
            onClick={goPrev}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-ocean/60 text-gray-300 hover:bg-dark-teal hover:text-white'
                : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            ← {seasons[(currentSeason - 1 + seasons.length) % seasons.length].name}
          </button>

          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {currentSeason + 1} / {seasons.length}
          </span>

          <button
            onClick={goNext}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-ocean/60 text-gray-300 hover:bg-dark-teal hover:text-white'
                : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            {seasons[(currentSeason + 1) % seasons.length].name} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
