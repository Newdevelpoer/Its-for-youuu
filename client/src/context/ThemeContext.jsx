import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const lightTheme = {
  bg: 'linear-gradient(135deg, #ffc8dd 0%, #cdb4db 50%, #bde0fe 100%)',
  bgClass: 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100',
  cardBg: 'rgba(255,255,255,0.7)',
  cardClass: 'bg-white/70',
  text: '#4a2c6b',
  textClass: 'text-purple-900',
  subtext: '#7c5cbf',
  subtextClass: 'text-purple-600',
  primary: '#cdb4db',
  primaryClass: 'bg-pastel-purple',
  secondary: '#ffafcc',
  secondaryClass: 'bg-pastel-hotpink',
  accent: '#7bf1a8',
  accentClass: 'bg-pastel-mint',
  navBg: 'rgba(255,200,221,0.85)',
  navClass: 'bg-pink-100/85',
  border: '#ffc8dd',
  borderClass: 'border-pink-200',
  colors: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#7bf1a8'],
}

export const darkTheme = {
  bg: 'linear-gradient(135deg, #13005A 0%, #00337C 50%, #1C82AD 100%)',
  bgClass: 'bg-gradient-to-br from-indigo-950 via-blue-950 to-cyan-900',
  cardBg: 'rgba(0,51,124,0.5)',
  cardClass: 'bg-blue-950/50',
  text: '#e0f7ff',
  textClass: 'text-cyan-50',
  subtext: '#03C988',
  subtextClass: 'text-emerald-400',
  primary: '#1C82AD',
  primaryClass: 'bg-cyan-700',
  secondary: '#03C988',
  secondaryClass: 'bg-emerald-500',
  accent: '#dd3131',
  accentClass: 'bg-red-600',
  navBg: 'rgba(19,0,90,0.9)',
  navClass: 'bg-indigo-950/90',
  border: '#1C82AD',
  borderClass: 'border-cyan-700',
  colors: ['#13005A', '#00337C', '#1C82AD', '#03C988', '#dd3131'],
}

export function ThemeProvider({ children }) {
  const getTimeBasedTheme = () => {
    const hour = new Date().getHours()
    return hour >= 6 && hour < 18 ? 'light' : 'dark'
  }

  const [themeMode, setThemeMode] = useState(getTimeBasedTheme)
  const isDark = themeMode === 'dark'
  const theme = isDark ? darkTheme : lightTheme

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, themeMode }}>
      <div
        className="min-h-screen transition-all duration-700"
        style={{ background: theme.bg, color: theme.text }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
