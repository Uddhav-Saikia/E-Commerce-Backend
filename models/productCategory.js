const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
