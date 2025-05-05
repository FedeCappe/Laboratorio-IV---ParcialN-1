const Book = require('../models/Book');
const Author = require('../models/Author');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Libro no encontrado');
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { titulo, resumen, genero, publicacion, disponible } = req.body;
  if (!titulo || !genero || !publicacion || disponible === undefined) {
    return res.status(400).send('Faltan campos obligatorios');
  }
  const book = new Book({ titulo, resumen, genero, publicacion, disponible });
  await book.save();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).send('Libro no encontrado');
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const authors = await Author.find({ libros: req.params.id });
  if (authors.length) return res.status(400).send('No se puede eliminar, libro asignado a autor');
  await Book.findByIdAndDelete(req.params.id);
  res.send('Libro eliminado');
};

