const express = require('express');
const Visit = require('../models/Visit');

const router = express.Router();

// GET /api/visits
router.get('/', async (req, res) => {
  try {
    let visit = await Visit.findOne();
    if (!visit) {
      visit = await Visit.create({ count: 0 });
    }
    res.json({ count: visit.count, lastVisit: visit.lastVisit });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visit count' });
  }
});

// POST /api/visits/increment
router.post('/increment', async (req, res) => {
  try {
    let visit = await Visit.findOne();
    if (!visit) {
      visit = await Visit.create({ count: 1, lastVisit: new Date() });
    } else {
      visit.count += 1;
      visit.lastVisit = new Date();
      await visit.save();
    }
    res.json({ count: visit.count, lastVisit: visit.lastVisit });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing visit count' });
  }
});

module.exports = router;
