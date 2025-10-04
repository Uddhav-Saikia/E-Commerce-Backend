const mongoose = require('mongoose');

const CCTransactionSchema = new mongoose.Schema({
  code: { type: String },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder' },
  transdate: { type: Date, default: Date.now },
  processor: { type: String },
  processor_trans_id: { type: String },
  amount: { type: Number, default: 0 },
  cc_num: { type: String },
  cc_type: { type: String },
  response: { type: String },
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CCTransaction', CCTransactionSchema);
