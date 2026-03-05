import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const SEASONS = [
  { id: 'monsoon', label: 'Monsoon', emoji: '🌧️', color: '#4a90d9' },
  { id: 'winter', label: 'Winter', emoji: '❄️', color: '#a8d8ea' },
  { id: 'spring', label: 'Spring', emoji: '🌸', color: '#ffb7c5' },
  { id: 'autumn', label: 'Autumn', emoji: '🍂', color: '#d4843b' },
]

const DEMO_PHOTOS = {
  monsoon: [
    { id: 1, emoji: '🌧️', bg: 'linear-gradient(135deg, #1a6b9a, #2d9cdb)', label: 'Rainy Day' },
    { id: 2, emoji: '🌈', bg: 'linear-gradient(135deg, #667eea, #764ba2)', label: 'After the Rain' },
    { id: 3, emoji: '☔', bg: 'linear-gradient(135deg, #4a90d9, #005b9e)', label: 'Umbrella Walks' },
    { id: 4, emoji: '⛈️', bg: 'linear-gradient(135deg, #2c3e50, #4ca1af)', label: 'Thunder & Lightning' },
  ],
  winter: [
    { id: 1, emoji: '❄️', bg: 'linear-gradient(135deg, #a8d8ea, #c4e0ef)', label: 'First Snow' },
    { id: 2, emoji: '☃️', bg: 'linear-gradient(135deg, #d4e9f7, #89c4e1)', label: 'Snowman' },
    { id: 3, emoji: '🧣', bg: 'linear-gradient(135deg, #6fc3df, #8fd3f4)', label: 'Cozy Winter' },
    { id: 4, emoji: '🌨️', bg: 'linear-gradient(135deg, #b8d4e8, #7ab8d9)', label: 'Snowfall' },
  ],
  spring: [
    { id: 1, emoji: '🌸', bg: 'linear-gradient(135deg, #ffc3d5, #ff8fa3)', label: 'Cherry Blossoms' },
    { id: 2, emoji: '🌺', bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)', label: 'Blooming Flowers' },
    { id: 3, emoji: '🦋', bg: 'linear-gradient(135deg, #fddb92, #d1fdff)', label: 'Butterflies' },
    { id: 4, emoji: '🌼', bg: 'linear-gradient(135deg, #fffde7, #ffe0b2)', label: 'Sunny Meadows' },
  ],
  autumn: [
    { id: 1, emoji: '🍂', bg: 'linear-gradient(135deg, #d4843b, #c0392b)', label: 'Autumn Leaves' },
    { id: 2, emoji: '🍁', bg: 'linear-gradient(135deg, #e67e22, #d35400)', label: 'Maple Season' },
    { id: 3, emoji: '🎃', bg: 'linear-gradient(135deg, #f39c12, #e67e22)', label: 'Halloween Vibes' },
    { id: 4, emoji: '🌾', bg: 'linear-gradient(135deg, #f0c040, #d4843b)', label: 'Golden Harvest' },
  ],
}

function RainAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-blue-300 opacity-60 rounded-full"
          style={{
            left: `${i * 5.2}%`,
            height: `${20 + Math.random() * 30}px`,
            animation: `rainFall ${0.8 + (i % 5) * 0.2}s linear ${i * 0.1}s infinite`,
            top: '-30px',
          }}
        />
      ))}
    </div>
  )
}

function SnowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-white"
          style={{
            left: `${i * 5.3}%`,
            fontSize: `${10 + (i % 4) * 5}px`,
            animation: `snowFall ${3 + (i % 3)}s linear ${i * 0.3}s infinite`,
            top: '-20px',
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

function PetalAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-300"
          style={{
            left: `${i * 7}%`,
            fontSize: `${12 + (i % 3) * 6}px`,
            animation: `petalFall ${4 + (i % 4)}s ease-in ${i * 0.4}s infinite`,
            top: '-20px',
          }}
        >
          🌸
        </div>
      ))}
    </div>
  )
}

function LeafAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${i * 8.5}%`,
            fontSize: `${14 + (i % 3) * 6}px`,
            animation: `leafFall ${4 + (i % 4)}s ease-in ${i * 0.5}s infinite`,
            top: '-20px',
          }}
        >
          🍂
        </div>
      ))}
    </div>
  )
}

const SEASON_ANIMATIONS = {
  monsoon: RainAnimation,
  winter: SnowAnimation,
  spring: PetalAnimation,
  autumn: LeafAnimation,
}

export default function Gallery() {
  const { theme, isDark } = useTheme()
  const { isAuthenticated } = useAuth()
  const [activeSeasonIdx, setActiveSeasonIdx] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [photos] = useState(DEMO_PHOTOS)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const activeSeason = SEASONS[activeSeasonIdx]
  const SeasonAnimation = SEASON_ANIMATIONS[activeSeason.id]
  const currentPhotos = photos[activeSeason.id] || []

  const changeSeason = useCallback((newIdx) => {
    if (transitioning || newIdx === activeSeasonIdx) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveSeasonIdx(newIdx)
      setTimeout(() => setTransitioning(false), 400)
    }, 300)
  }, [transitioning, activeSeasonIdx])

  const handlePrev = () => changeSeason((activeSeasonIdx - 1 + SEASONS.length) % SEASONS.length)
  const handleNext = () => changeSeason((activeSeasonIdx + 1) % SEASONS.length)

  const getSeasonBg = (id) => {
    const bgs = {
      monsoon: isDark
        ? 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 50%, #2d6a9f 100%)'
        : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
      winter: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2d6b9f 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 50%, #bfdbfe 100%)',
      spring: isDark
        ? 'linear-gradient(135deg, #4a1942 0%, #7b2d79 50%, #b85fb5 100%)'
        : 'linear-gradient(135deg, #fff0f3 0%, #ffccd5 50%, #ffa8b8 100%)',
      autumn: isDark
        ? 'linear-gradient(135deg, #3d1700 0%, #7a3100 50%, #c4560a 100%)'
        : 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)',
    }
    return bgs[id]
  }

  return (
    <div
      className="min-h-screen pt-20 pb-10 relative overflow-hidden transition-all duration-700"
      style={{ background: getSeasonBg(activeSeason.id) }}
    >
      <SeasonAnimation />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: theme.text }}>
            Memory Gallery
          </h1>
          <p className="text-lg" style={{ color: theme.subtext }}>
            Seasons of beautiful moments ✨
          </p>
        </div>

        {/* Season Tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {SEASONS.map((season, idx) => (
            <button
              key={season.id}
              onClick={() => changeSeason(idx)}
              className="px-5 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: activeSeasonIdx === idx ? season.color : theme.cardBg,
                color: activeSeasonIdx === idx ? '#fff' : theme.text,
                border: `2px solid ${activeSeasonIdx === idx ? season.color : theme.border}`,
                boxShadow: activeSeasonIdx === idx ? `0 4px 15px ${season.color}60` : 'none',
              }}
            >
              {season.emoji} {season.label}
            </button>
          ))}
        </div>

        {/* Navigation & Upload Row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full hover:scale-110 transition-all duration-300"
            style={{ background: theme.cardBg, color: theme.text, border: `1px solid ${theme.border}` }}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-2xl font-bold" style={{ color: theme.text }}>
            {activeSeason.emoji} {activeSeason.label}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
                style={{ background: activeSeason.color, color: '#fff' }}
              >
                <Upload size={16} />
                Upload
              </button>
            )}
            <button
              onClick={handleNext}
              className="p-3 rounded-full hover:scale-110 transition-all duration-300"
              style={{ background: theme.cardBg, color: theme.text, border: `1px solid ${theme.border}` }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div
          className="transition-all duration-500"
          style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(20px)' : 'translateY(0)' }}
        >
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {currentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                style={{
                  background: photo.bg,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ height: `${150 + (photo.id * 30) % 100}px` }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {photo.emoji}
                    </div>
                    <div className="text-white text-sm font-medium px-3">{photo.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="rounded-3xl p-8 max-w-sm w-full text-center"
            style={{ background: selectedPhoto.bg }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-8xl mb-4">{selectedPhoto.emoji}</div>
            <p className="text-white text-xl font-bold">{selectedPhoto.label}</p>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="mt-4 px-6 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <div
            className="rounded-3xl p-8 max-w-md w-full"
            style={{ background: theme.cardBg, border: `2px solid ${theme.border}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: theme.text }}>
                Upload to {activeSeason.label}
              </h3>
              <button onClick={() => setShowUpload(false)}>
                <X size={20} style={{ color: theme.text }} />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 rounded-xl mb-4"
              style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: theme.text }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  toast.success('Photo uploaded! (Demo mode)')
                  setShowUpload(false)
                }
              }}
            />
            <p className="text-sm" style={{ color: theme.subtext }}>
              Select a photo to add to the {activeSeason.label} collection
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
