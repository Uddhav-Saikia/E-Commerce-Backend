const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
  value: { type: Number },
  multiple: { type: Boolean, default: false },
  start_date: { type: Date },
  end_date: { type: Date },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', CouponSchema);
