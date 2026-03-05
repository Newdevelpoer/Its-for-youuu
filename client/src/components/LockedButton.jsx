import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';

const LockedButton = () => {
  const { theme } = useTheme();
  const [status, setStatus] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    api.get('/surprise/status')
      .then((res) => setStatus(res.data))
      .catch(() => setStatus({ unlocked: false, message: '🔒 A magical surprise awaits...' }));
  }, []);

  if (!status) return null;

  if (status.unlocked) {
    return (
      <Link
        to="/surprise"
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${
          theme === 'light'
            ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-pink-300/50'
            : 'bg-gradient-to-r from-dark-teal to-dark-blue2 text-white hover:shadow-dark-teal/50'
        }`}
      >
        🎉 Open Your Surprise!
      </Link>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`locked-btn inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold cursor-not-allowed opacity-60 border-2 border-dashed ${
          theme === 'light'
            ? 'border-gray-400 text-gray-500 bg-gray-100'
            : 'border-gray-600 text-gray-400 bg-gray-900/50'
        }`}
      >
        🔒 Surprise Locked
        {status.daysUntilBirthday > 0 && (
          <span className="text-sm ml-1">({status.daysUntilBirthday} days)</span>
        )}
      </button>
      {showTooltip && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg text-sm text-center max-w-xs shadow-lg z-50 ${
            theme === 'light'
              ? 'bg-gray-800 text-white'
              : 'bg-dark-blue1 text-gray-100'
          }`}
        >
          {status.message}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

export default LockedButton;
