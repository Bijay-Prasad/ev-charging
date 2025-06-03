const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['Active', 'Inactive'] },
  powerOutput: Number,
  connectorType: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Charger', chargerSchema);