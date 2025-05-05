const express = require('express');
const router = express.Router();
const controller = require('../controllers/authorController');

router.get('/', controller.getAllAuthors);
router.get('/:id', controller.getAuthorById);
router.post('/', controller.createAuthor);
router.put('/:id', controller.updateAuthor);
router.delete('/:id', controller.deleteAuthor);
router.put('/:id/addBook/:bookId', controller.addBookToAuthor);

module.exports = router;
