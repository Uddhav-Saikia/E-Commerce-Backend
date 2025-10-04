const mongoose = require('mongoose');

const ProductTagSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductTag', ProductTagSchema);
