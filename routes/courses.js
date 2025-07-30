// routes/books.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one course
router.get('/:id', getCourse, (req, res) => {
  res.json(res.course);
});

// Middleware to get a course by ID
async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: 'Cannot find course' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.course = course;
  next();
}

module.exports = router;
