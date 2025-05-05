const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'Libros',
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión:', err));

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
