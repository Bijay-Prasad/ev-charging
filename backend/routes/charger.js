const express = require('express');
const Charger = require('../models/Charger');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Charger
router.post('/', auth, async (req, res) => {
  const charger = new Charger({ ...req.body, createdBy: req.user.id });
  await charger.save();
  res.status(201).json(charger);
});

// Read Chargers
router.get('/', auth, async (req, res) => {
  const chargers = await Charger.find();
  res.json(chargers);
});

// Update Charger
router.put('/:id', auth, async (req, res) => {
  const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(charger);
});

// Delete Charger
router.delete('/:id', auth, async (req, res) => {
  await Charger.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;