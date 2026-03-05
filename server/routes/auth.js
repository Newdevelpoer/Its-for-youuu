const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')

let User = null
try {
  User = require('../models/User')
} catch (e) {}

// Strict rate limit for auth endpoints — 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' },
})

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production')
    }
    console.warn('⚠️  JWT_SECRET not set — using insecure default. Set JWT_SECRET before deploying.')
    return 'dev_only_secret_change_before_deploy'
  }
  return secret
})()
const JWT_EXPIRES = '7d'

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}

// POST /api/auth/register
router.post('/register', authLimiter, [
  body('username').trim().isLength({ min: 2, max: 50 }).withMessage('Username must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }

  const { username, email, password } = req.body

  if (!User) {
    const mockUser = { _id: Date.now().toString(), username, email }
    const token = generateToken(mockUser._id)
    return res.status(201).json({ token, user: { id: mockUser._id, username, email } })
  }

  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const user = await User.create({ username, email, password })
    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }

  const { email, password } = req.body

  if (!User) {
    return res.status(401).json({ message: 'Database not connected' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Login failed' })
  }
})

module.exports = router
