import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, LogIn, LogOut, Home, Image, Heart, Gamepad2, Gift } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/about', label: 'About', icon: Heart },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/surprise', label: 'Surprise', icon: Gift },
]

export default function Navbar() {
  const { theme, isDark, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg"
      style={{
        background: theme.navBg,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
            <span className="text-2xl">🌻</span>
            <span className="hidden sm:block">Living Memory</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive(path) ? theme.primary : 'transparent',
                  color: isActive(path) ? (isDark ? '#fff' : '#4a2c6b') : theme.text,
                  boxShadow: isActive(path) ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{ background: theme.cardBg, color: theme.text }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ background: theme.secondary, color: isDark ? '#fff' : '#4a2c6b' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ background: theme.secondary, color: isDark ? '#fff' : '#4a2c6b' }}
              >
                <LogIn size={16} />
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full"
              style={{ color: theme.text }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-3 border-t" style={{ borderColor: theme.border }}>
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl my-1 transition-all duration-300"
                style={{
                  background: isActive(path) ? theme.primary : 'transparent',
                  color: theme.text,
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setIsOpen(false) }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl my-1 w-full text-left"
                style={{ color: theme.text }}
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl my-1"
                style={{ color: theme.text }}
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
