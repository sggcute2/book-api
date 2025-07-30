// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: {
    image: String,
    name: { type: String, required: true }
  },
  judul: { type: String, required: true },
  nomor: String,
});

module.exports = mongoose.model('Book', bookSchema);
