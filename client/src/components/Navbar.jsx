import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: '🏠 Home' },
    { to: '/gallery', label: '🖼️ Gallery' },
    { to: '/about', label: '💫 About' },
    { to: '/games', label: '🎮 Games' },
    { to: '/surprise', label: '🎁 Surprise' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg dark:shadow-dark-teal/20'
          : ''
      } ${
        theme === 'light'
          ? 'bg-white/80 text-gray-800'
          : 'bg-dark-navy/80 text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-dancing text-2xl font-bold"
          style={{ color: theme === 'light' ? '#cdb4db' : '#03C988' }}
        >
          ✨ Its For Youuu
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 font-quicksand ${
                isActive(link.to)
                  ? theme === 'light'
                    ? 'bg-light-purple/60 text-gray-800'
                    : 'bg-dark-teal/30 text-dark-teal'
                  : theme === 'light'
                  ? 'hover:bg-light-pink1/40 text-gray-700'
                  : 'hover:bg-dark-blue2/30 text-gray-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full text-lg transition-all duration-200 ${
              theme === 'light'
                ? 'bg-light-purple/30 hover:bg-light-purple/60'
                : 'bg-dark-blue2/30 hover:bg-dark-blue2/60'
            }`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold hidden sm:block">
                👤 {user.username}
              </span>
              <button
                onClick={logout}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-light-pink2/40 hover:bg-light-pink2/70 text-gray-700'
                    : 'bg-dark-red/30 hover:bg-dark-red/60 text-white'
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                theme === 'light'
                  ? 'bg-light-purple/40 hover:bg-light-purple/70 text-gray-700'
                  : 'bg-dark-teal/30 hover:bg-dark-teal/60 text-white'
              }`}
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-4 pb-4 ${
            theme === 'light' ? 'bg-white/95' : 'bg-dark-navy/95'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-all ${
                isActive(link.to)
                  ? theme === 'light'
                    ? 'bg-light-purple/40'
                    : 'bg-dark-teal/20 text-dark-teal'
                  : theme === 'light'
                  ? 'hover:bg-light-pink1/30'
                  : 'hover:bg-dark-blue2/20'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
