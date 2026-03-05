const express = require('express');
const Visit = require('../models/Visit');

const router = express.Router();

// Get visit count
router.get('/', async (req, res) => {
  try {
    let visit = await Visit.findOne();
    if (!visit) {
      visit = new Visit({ count: 0 });
      await visit.save();
    }
    res.json({ count: visit.count });
  } catch (err) {
    // Fallback for when DB is not connected
    res.json({ count: 0 });
  }
});

// Increment visit count
router.post('/increment', async (req, res) => {
  try {
    let visit = await Visit.findOne();
    if (!visit) {
      visit = new Visit({ count: 1 });
    } else {
      visit.count += 1;
      visit.lastVisit = new Date();
    }
    await visit.save();
    res.json({ count: visit.count });
  } catch (err) {
    res.json({ count: 0 });
  }
});

module.exports = router;
