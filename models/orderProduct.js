const mongoose = require('mongoose');

const OrderProductSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  sku: { type: String },
  name: { type: String },
  description: { type: String },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  subtotal: { type: Number, default: 0 },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderProduct', OrderProductSchema);
