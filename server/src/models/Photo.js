const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['monsoon', 'winter', 'autumn', 'spring'] 
  },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', photoSchema);
