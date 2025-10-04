const mongoose = require('mongoose');

const SalesOrderSchema = new mongoose.Schema({
  order_date: { type: Date, default: Date.now },
  total: { type: Number, default: 0 },
  coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', default: null },
  session_id: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);
