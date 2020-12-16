require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error, response) => {
  if(error) throw new Error(error);
  console.log('Conexion a BD existosa!'.green);
});

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
});