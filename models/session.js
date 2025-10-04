const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  has: { type: String },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
