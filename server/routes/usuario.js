const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion');

const app = express();

app.get('/', function (req, res) {
  res.json('Irwing Docker Mongo')
});

app.get('/usuario', verificarToken, (req, res) => {

  let desde = Number(req.query.desde) || 0;
  let limit = Number(req.query.limit) || 3;

  Usuario.find({ state: true }, 'name email img role state google')
    .skip(desde)
    .limit(limit)
    .exec((error, usuarios) => {
      if (error) {
        return res.status(400).json({
          result: 'error',
          message: error
        });
      }

      Usuario.count({ state: true }, (error, count) => {
        res.json({
          result: 'success',
          data: usuarios,
          records: count
        });
      });
    });
});

app.post('/usuario', [verificarToken, verificarAdminRole], (req, res) => {
  const body = req.body;

  let usuario = new Usuario({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });


  usuario.save((error, usuarioBd) => {
    if (error) {
      return res.status(400).json({
        result: 'error',
        message: error
      });
    }

    res.json({
      result: 'success',
      data: usuarioBd
    });
  });
});

app.put('/usuario/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioBd) => {
    if (error) {
      return res.status(400).json({
        result: 'error',
        message: error
      });
    }

    res.json({
      result: 'success',
      data: usuarioBd
    });
  });
});

app.delete('/usuario/:id', verificarToken, (req, res) => {
  let id = req.params.id;

  Usuario.findByIdAndUpdate(id, {
    state: false
  }, {
    new: true, // Retornar el objeto actualizado
    runValidators: true // validacion del modelo
  }, (error, usuarioDisabled) => {
    if (error) {
      return res.status(400).json({
        result: 'error',
        message: error
      });
    }

    res.json({
      result: 'success',
      data: usuarioDisabled
    });
  });
  // Usuario.findByIdAndRemove(id, (error, usuarioEliminado) => {
  //   if (error) {
  //     return res.status(400).json({
  //       result: 'error',
  //       message: error
  //     });
  //   }

  //   if (!usuarioEliminado) {
  //     return res.status(400).json({
  //       result: 'error',
  //       message: 'Usuario no encontrado.'
  //     });
  //   }

  //   res.json({
  //     result: 'success',
  //     data: usuarioEliminado
  //   });
  // });
});

module.exports = app;