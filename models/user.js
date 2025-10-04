const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  active: { type: Boolean, default: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  inserted_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
