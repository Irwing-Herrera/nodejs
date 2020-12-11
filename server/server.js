require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');

const app = express();

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useCreateIndex: true
}, (error, response) => {
  if(error) throw new Error(error);
  console.log('Conexion a BD existosa!'.green);
});

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
});