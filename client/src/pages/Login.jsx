import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function Login() {
  const { theme, isDark } = useTheme()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: theme.cardBg,
            border: `2px solid ${theme.border}`,
            boxShadow: isDark ? '0 8px 30px rgba(28,130,173,0.2)' : '0 8px 30px rgba(205,180,219,0.3)',
          }}
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🌸</div>
            <h1 className="text-3xl font-bold" style={{ color: theme.text }}>Welcome Back</h1>
            <p className="mt-2 text-sm" style={{ color: theme.subtext }}>
              Sign in to your magical space ✨
            </p>
          </div>

          {error && (
            <div
              className="rounded-xl p-3 mb-4 text-sm text-center"
              style={{ background: isDark ? 'rgba(221,49,49,0.2)' : 'rgba(255,100,100,0.1)', color: '#dd3131' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: theme.subtext }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: `1.5px solid ${theme.border}`,
                  color: theme.text,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: theme.subtext }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm pr-10"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    border: `1.5px solid ${theme.border}`,
                    color: theme.text,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: theme.subtext }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-70"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #1C82AD, #03C988)'
                  : 'linear-gradient(135deg, #ffafcc, #cdb4db)',
                color: '#fff',
              }}
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm hover:underline"
              style={{ color: theme.subtext }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
