// models/Config.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    "title": { type: String, required: true },
    "author": String,
    "price": String,
    "classes": String,
    "students": String,
    "image": String
});

module.exports = mongoose.model('Course', courseSchema);
