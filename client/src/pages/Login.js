import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { isDark } = useTheme();
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        await register(username, password);
      } else {
        await login(username, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className={`min-h-screen pt-20 flex items-center justify-center ${
      isDark
        ? 'bg-gradient-to-br from-dark-navy via-dark-ocean to-dark-navy'
        : 'bg-gradient-to-br from-light-pink via-light-rose to-light-sky'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-md ${
        isDark
          ? 'bg-dark-ocean/50 border border-dark-teal/30'
          : 'bg-white/50 border border-light-rose/30'
      }`}>
        <div className="text-center mb-8">
          <span className="text-5xl">💖</span>
          <h1 className={`font-display text-2xl font-bold mt-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {isRegister ? 'Join the Living Memory' : 'Enter your digital world'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-dark-navy/50 border-dark-teal/30 text-white focus:ring-dark-green/50'
                  : 'bg-white/70 border-light-rose/30 text-gray-800 focus:ring-light-pink/50'
              }`}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-dark-navy/50 border-dark-teal/30 text-white focus:ring-dark-green/50'
                  : 'bg-white/70 border-light-rose/30 text-gray-800 focus:ring-light-pink/50'
              }`}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isDark
                ? 'bg-dark-green text-white hover:shadow-lg hover:shadow-dark-green/30'
                : 'bg-light-coral text-white hover:shadow-lg hover:shadow-light-coral/30'
            } ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02]'}`}
          >
            {loading ? '...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className={`font-medium ${isDark ? 'text-dark-green hover:text-dark-green/80' : 'text-light-pink hover:text-light-coral'}`}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
