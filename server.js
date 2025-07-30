// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://154.19.37.93:27017/bookDB'/*, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}*/);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use book routes
app.use('/books', bookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
