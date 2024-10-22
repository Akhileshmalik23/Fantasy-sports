const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    
  },
  battingStyle: {
    type: String,
    
  },
  bowlingStyle: {
    type: String,
    
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  team: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Player', playerSchema)
