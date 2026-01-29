const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: String,
  description: String,
  partnerName: String,
  category: String,
  isLocked: { type: Boolean, default: false },
  benefitValue: String, 
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);