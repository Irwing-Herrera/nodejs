// =============
// Puerto
// =============
process.env.PORT = process.env.PORT || 3000;

// =============
// Entorno
// =============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============
// Base de Datos
// =============
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:2717/videojuegos';
} else {
  urlDB = 'mongodb+srv://irwing:5gLBEegYsrC7nMAF@cluster0.yr3gl.mongodb.net/videojuegos';
}

process.env.URL_DB = urlDB;