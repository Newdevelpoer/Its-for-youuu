const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const rateLimit = require('express-rate-limit')

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Global rate limiter — 200 requests per 15 minutes per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
}))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/photos', require('./routes/photos'))
app.use('/api/visits', require('./routes/visits'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Living Memory API is running 🌸' })
})

const PORT = process.env.PORT || 5000

let mongoose = null
try {
  mongoose = require('mongoose')
} catch (e) {
  console.log('Mongoose not available')
}

const startServer = async () => {
  if (mongoose && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('✅ Connected to MongoDB')
    } catch (err) {
      console.log('⚠️  MongoDB connection failed, running without database')
    }
  } else {
    console.log('ℹ️  No MONGODB_URI set, running without database')
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

startServer()

module.exports = app
