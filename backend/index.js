const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const app = express();
require('dotenv').config();
 origin: [
    "http://localhost:3000", 
    "https://fantasy-sport-three.vercel.app" 
  ],

app.use(cors(corsOption));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.use(express.json());

app.use('/players', playerRoutes);
app.use('/team', teamRoutes);

app.get('/pink', (req, res) => {
  res.json('pop');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
