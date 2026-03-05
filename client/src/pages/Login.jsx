import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border font-quicksand text-sm transition-all duration-200 outline-none focus:ring-2 ${
    theme === 'light'
      ? 'bg-white/80 border-light-purple/30 text-gray-700 focus:ring-light-purple/50 focus:border-light-purple/60'
      : 'bg-dark-navy/60 border-dark-blue2/40 text-gray-200 focus:ring-dark-teal/50 focus:border-dark-teal/60'
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-light-purple/30 via-white to-light-pink1/30'
          : 'bg-gradient-to-br from-dark-navy via-dark-blue1/80 to-dark-blue2/40'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className={`p-8 rounded-3xl border shadow-2xl ${
            theme === 'light'
              ? 'bg-white/80 border-light-purple/20'
              : 'bg-dark-navy/80 border-dark-teal/15'
          }`}
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-bounce-soft">🐼</div>
            <h1
              className={`font-dancing font-bold text-3xl ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
            >
              Welcome Back ✨
            </h1>
            <p className={`font-quicksand text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Sign in to your magical world
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-quicksand">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 font-quicksand ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className={inputClass}
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 font-quicksand ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className={inputClass}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-light-purple to-light-pink2 text-gray-700 hover:shadow-lg hover:shadow-light-purple/30'
                  : 'bg-gradient-to-r from-dark-teal to-dark-blue2 text-white hover:shadow-lg hover:shadow-dark-teal/30'
              }`}
            >
              {loading ? '✨ Signing in...' : '✨ Sign In'}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 font-quicksand ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className={`font-semibold hover:underline ${theme === 'light' ? 'text-light-purple' : 'text-dark-teal'}`}
              style={{ color: theme === 'light' ? '#cdb4db' : '#03C988' }}
            >
              Register here
            </Link>
          </p>
        </div>

        <p className={`text-center mt-4 text-sm font-dancing ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
          Made with 💖 just for you ✨
        </p>
      </div>
    </div>
  );
};

export default Login;
