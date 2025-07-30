// routes/books.js
const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Get all
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one setting
router.get('/:id', getSetting, (req, res) => {
  res.json(res.setting);
});

// Middleware to get a setting by ID
async function getSetting(req, res, next) {
  let setting;
  try {
    setting = await Setting.findById(req.params.id);
    if (setting == null) {
      return res.status(404).json({ message: 'Cannot find config' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.setting = setting;
  next();
}

module.exports = router;
