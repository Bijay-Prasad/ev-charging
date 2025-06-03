const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/charger');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    return res.status(200).send({message: "Welcome to Charger App api - node", status: true})
});

app.get('/api/reverse-geocode', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      { headers: { 'User-Agent': 'charging-station-app/1.0' } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Reverse geocoding failed' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/chargers', chargerRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => console.log(err));