const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = require('../model/Team');
const Player = require('../model/Player'); 

// const Player = require('./models/Player');

router.post('/create', async (req, res) => {
  const { teamName, playerNames } = req.body;

  try {
    const players = await Player.find({ name: { $in: playerNames } });

    if (players.length !== playerNames.length) {
      return res.status(404).json({ message: "One or more players not found" });
    }

    const playerIds = players.map(player => player._id);

    const teamData = {
      name: teamName,
      players: playerIds
    };

    const team = await Team.insertMany([teamData]);
    res.status(201).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating team", error: err.message });
  }
});


// Get a team by ID
router.get('/:name', async (req, res) => {
  try {
    const team = await Team.findOne({ name: req.params.name }).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
