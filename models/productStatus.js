const mongoose = require('mongoose');

const ProductStatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductStatus', ProductStatusSchema);
