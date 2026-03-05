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
    console.error('Error fetching visit count:', err.message);
    res.status(500).json({ message: 'Failed to fetch visit count', count: 0 });
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
    console.error('Error incrementing visit count:', err.message);
    res.status(500).json({ message: 'Failed to increment visit count', count: 0 });
  }
});

module.exports = router;
