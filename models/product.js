const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  product_status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductStatus' },
  regular_price: { type: Number, default: 0 },
  discount_price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  taxable: { type: Boolean, default: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
