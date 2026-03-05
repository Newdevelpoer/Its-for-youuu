const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');
const Photo = require('../models/Photo');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.params.category || 'general';
    const categoryDir = path.join(uploadsDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    cb(null, categoryDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Get photos by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['monsoon', 'winter', 'autumn', 'spring'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    const photos = await Photo.find({ category }).sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error('Error fetching photos:', err.message);
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
});

// Upload photo to category (protected)
router.post('/:category/upload', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { category } = req.params;
    const validCategories = ['monsoon', 'winter', 'autumn', 'spring'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const photo = new Photo({
      filename: req.file.filename,
      originalName: req.file.originalname,
      category,
      url: `/uploads/${category}/${req.file.filename}`,
      uploadedBy: req.user.id
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    console.error('Photo upload error:', err.message);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
