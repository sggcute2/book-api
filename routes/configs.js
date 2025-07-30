// routes/books.js
const express = require('express');
const router = express.Router();
const Cfg = require('../models/Config');

// Get all
router.get('/', async (req, res) => {
  try {
    const cfgs = await Cfg.find();
    res.json(cfgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one config
router.get('/:id', getConfig, (req, res) => {
  res.json(res.cfg);
});

// Middleware to get a config by ID
async function getConfig(req, res, next) {
  let cfg;
  try {
    cfg = await Config.findById(req.params.id);
    if (cfg == null) {
      return res.status(404).json({ message: 'Cannot find config' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cfg = cfg;
  next();
}

module.exports = router;
