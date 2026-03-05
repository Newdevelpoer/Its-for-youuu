const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')

let VisitCount = null
try {
  VisitCount = require('../models/VisitCount')
} catch (e) {}

let inMemoryCount = 0

// Rate limiter for visit routes — 120 requests per 15 minutes per IP
const visitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
})

// GET /api/visits
router.get('/', visitLimiter, async (req, res) => {
  if (!VisitCount) {
    return res.json({ count: inMemoryCount })
  }
  try {
    let doc = await VisitCount.findOne()
    if (!doc) doc = await VisitCount.create({ count: 0 })
    res.json({ count: doc.count })
  } catch (err) {
    res.json({ count: inMemoryCount })
  }
})

// POST /api/visits/increment
router.post('/increment', visitLimiter, async (req, res) => {
  if (!VisitCount) {
    inMemoryCount++
    return res.json({ count: inMemoryCount })
  }
  try {
    let doc = await VisitCount.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    )
    res.json({ count: doc.count })
  } catch (err) {
    inMemoryCount++
    res.json({ count: inMemoryCount })
  }
})

module.exports = router
