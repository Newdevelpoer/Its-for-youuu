const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const rateLimit = require('express-rate-limit')
const authMiddleware = require('../middleware/auth')

let Photo = null
try {
  Photo = require('../models/Photo')
} catch (e) {}

// Rate limiter for photo routes — 60 requests per 15 minutes per IP
const photoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
})

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/
    const ok = allowed.test(path.extname(file.originalname).toLowerCase())
    cb(ok ? null : new Error('Only images allowed'), ok)
  },
})

// GET /api/photos/:season
router.get('/:season', photoLimiter, async (req, res) => {
  const { season } = req.params
  const valid = ['monsoon', 'winter', 'spring', 'autumn']
  if (!valid.includes(season)) {
    return res.status(400).json({ message: 'Invalid season' })
  }

  if (!Photo) {
    return res.json([])
  }

  try {
    const photos = await Photo.find({ category: season })
      .populate('uploadedBy', 'username')
      .sort('-createdAt')
      .limit(50)
    res.json(photos)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch photos' })
  }
})

// POST /api/photos/upload
router.post('/upload', photoLimiter, authMiddleware, upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  const { category, caption } = req.body
  const valid = ['monsoon', 'winter', 'spring', 'autumn']
  if (!valid.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' })
  }

  if (!Photo) {
    return res.json({ message: 'Photo recorded (no DB)', url: `/uploads/${req.file.filename}` })
  }

  try {
    const photo = await Photo.create({
      url: `/uploads/${req.file.filename}`,
      category,
      caption: caption || '',
      uploadedBy: req.user.id,
    })
    res.status(201).json(photo)
  } catch (err) {
    res.status(500).json({ message: 'Failed to save photo' })
  }
})

// DELETE /api/photos/:id
router.delete('/:id', photoLimiter, authMiddleware, async (req, res) => {
  if (!Photo) {
    return res.json({ message: 'Deleted (no DB)' })
  }

  try {
    const photo = await Photo.findById(req.params.id)
    if (!photo) return res.status(404).json({ message: 'Photo not found' })

    const filePath = path.join(__dirname, '..', photo.url)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await Photo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Photo deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete photo' })
  }
})

module.exports = router
