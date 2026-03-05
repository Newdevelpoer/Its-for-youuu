import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { path: '/', label: '✨ Home' },
  { path: '/gallery', label: '📸 Gallery' },
  { path: '/about', label: '💝 About' },
  { path: '/games', label: '🎮 Games' },
  { path: '/surprise', label: '🎁 Surprise' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
      isDark 
        ? 'bg-dark-navy/80 border-b border-dark-teal/30' 
        : 'bg-white/80 border-b border-light-pink/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`font-display font-bold text-xl ${
            isDark ? 'text-dark-green' : 'text-light-pink'
          }`}>
            💖 Living Memory
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? isDark
                      ? 'bg-dark-teal/30 text-dark-green'
                      : 'bg-light-rose/50 text-light-pink'
                    : isDark
                      ? 'text-gray-300 hover:bg-dark-ocean/50 hover:text-white'
                      : 'text-gray-600 hover:bg-light-sky/30 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className={`ml-2 p-2 rounded-full transition-all duration-300 ${
                isDark ? 'bg-dark-ocean hover:bg-dark-teal text-yellow-300' : 'bg-light-sky hover:bg-light-blue text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className={`ml-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isDark ? 'bg-dark-red/80 text-white hover:bg-dark-red' : 'bg-light-coral text-white hover:bg-light-rose'
                }`}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={`ml-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isDark ? 'bg-dark-green/80 text-white hover:bg-dark-green' : 'bg-light-mint text-gray-800 hover:bg-light-sky'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`text-2xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {mobileOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t ${
          isDark ? 'bg-dark-navy/95 border-dark-teal/30' : 'bg-white/95 border-light-pink/30'
        }`}>
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? isDark ? 'bg-dark-teal/30 text-dark-green' : 'bg-light-rose/50 text-light-pink'
                    : isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
