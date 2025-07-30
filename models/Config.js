// models/Config.js
const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  kkey: { type: String, required: true },
  vvalue: String,
});

module.exports = mongoose.model('Config', configSchema);
