const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find().populate('libros');
  res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id).populate('libros');
  if (!author) return res.status(404).send('Autor no encontrado');
  res.json(author);
};

exports.createAuthor = async (req, res) => {
  const { nombre, bio, fechaNacimiento, nacionalidad } = req.body;
  if (!nombre || !fechaNacimiento || !nacionalidad) {
    return res.status(400).send('Faltan campos obligatorios');
  }
  const author = new Author({ nombre, bio, fechaNacimiento, nacionalidad });
  await author.save();
  res.status(201).json(author);
};

exports.updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!author) return res.status(404).send('Autor no encontrado');
  res.json(author);
};

exports.deleteAuthor = async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.send('Autor eliminado');
};

exports.addBookToAuthor = async (req, res) => {
  const { id, bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).send('Libro no existe');
  const author = await Author.findById(id);
  if (!author) return res.status(404).send('Autor no existe');
  if (!author.libros.includes(bookId)) {
    author.libros.push(bookId);
    await author.save();
  }
  res.json(author);
};

