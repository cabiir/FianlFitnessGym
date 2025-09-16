const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
    lowercase: true
  },
  duration: {
    type: String,
    required: true
  },
  intensity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  workouts: {
    type: String,
    default: "0/20 completed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
trailSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Trail', trailSchema);