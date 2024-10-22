const express = require('express')
const router = express.Router()
const Player = require('../model/Player')

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find()
    res.json(players)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add new players (POST route at /players/create)
router.post('/create', async (req, res) => {
  const playersData = req.body  

  try {
    const newPlayers = await Player.insertMany(playersData) // Using insertMany to handle multiple players
    res.status(201).json(newPlayers)
  } catch (err) {
    console.log('dream11');
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
