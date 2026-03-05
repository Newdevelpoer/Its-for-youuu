const express = require('express');
const path = require('path');
const Photo = require('../models/Photo');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/photos/upload
router.post('/upload', protect, (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { category } = req.body;
    const validCategories = ['monsoon', 'winter', 'autumn', 'spring'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    try {
      const photo = await Photo.create({
        filename: req.file.filename,
        originalName: req.file.originalname,
        category,
        uploadedBy: req.user._id,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });

      res.status(201).json({
        _id: photo._id,
        filename: photo.filename,
        category: photo.category,
        url: `/uploads/${category}/${photo.filename}`,
        createdAt: photo.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving photo' });
    }
  });
});

// GET /api/photos/:category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const validCategories = ['monsoon', 'winter', 'autumn', 'spring'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const photos = await Photo.find({ category }).sort({ createdAt: -1 });
    const photosWithUrls = photos.map((p) => ({
      _id: p._id,
      filename: p.filename,
      originalName: p.originalName,
      category: p.category,
      url: `/uploads/${category}/${p.filename}`,
      createdAt: p.createdAt,
    }));
    res.json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

module.exports = router;
