require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/books');
const settingRoutes = require('./routes/settings');
const courseRoutes = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI/*, {
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
app.use('/settings', settingRoutes);
app.use('/courses', courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
