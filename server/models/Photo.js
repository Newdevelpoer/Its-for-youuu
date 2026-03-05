const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['monsoon', 'winter', 'spring', 'autumn'],
    required: true,
  },
  caption: {
    type: String,
    default: '',
    maxlength: 500,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('Photo', photoSchema)
