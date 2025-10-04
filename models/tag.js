const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', TagSchema);
