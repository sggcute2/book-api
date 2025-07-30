// models/Setting.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  kkey: { type: String, required: true },
  vvalue: String,
});

module.exports = mongoose.model('Setting', settingSchema);
