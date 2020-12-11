// =============
// Puerto
// =============
process.env.PORT = process.env.PORT || 3000;

// =============
// Entorno
// =============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============
// Vencimiento del Token
// =============
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// =============
// Semilla de Autenticacion
// =============
process.env.SEED = process.env.SEED || 'llave-de-token';

// =============
// Base de Datos
// =============
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:2717/videojuegos';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;