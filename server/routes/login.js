require('../config/config');

const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', function (req, res) {
  const body = req.body;

  Usuario.findOne({email: body.email}, (error, usuarioDB) => {
    if (error) {
      return res.status(400).json({
        result: 'error',
        message: error
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        result: 'error',
        message: `Usuario o Contraseña incorrecto.`
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        result: 'error',
        message: `Usuario o 'Contraseña' incorrecto.`
      });
    }

    let token = jwt.sign({
      usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

    res.json({
      result: 'success',
      data: usuarioDB,
      token // expira en 1 hora
    });
  });
});

module.exports = app;