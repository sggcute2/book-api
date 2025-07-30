// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Create one book
router.post('/', async (req, res) => {
  const book = new Book({
    user: {
        image: req.body.user.image,
        name: req.body.user.name
    },
    judul: req.body.judul,
    nomor: req.body.nomor,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one book
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.user?.image != null) {
    res.book.user.image = req.body.user.image;
  }
  if (req.body.user?.name != null) {
    res.book.user.name = req.body.user.name;
  }
  if (req.body.judul != null) {
    res.book.judul = req.body.judul;
  }
  if (req.body.nomor != null) {
    res.book.nomor = req.body.nomor;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
