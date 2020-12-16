const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

// Note that this option available for versions 1.0.0 and newer.
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.put('/upload/:tipo/:id', (req, res) => {
  let tipo = req.params.tipo;
  let id = req.params.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      result: 'error',
      message: 'Ningun archivo fue cargado.'
    });
  }

  // Tipos validos
  let tiposValidos = ['videojuegos', 'usuarios'];

  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      result: 'error',
      message: `Los tipos permitidos son ${tiposValidos.join(', ')}`
    });
  }

  // El nombre del campo de entrada (es decir, "archivo") se utiliza para recuperar el archivo cargado
  let sampleFile = req.files.archivo;
  let nombreArchivo = sampleFile.name.split('.');
  let extension = sampleFile.name.split('.')[nombreArchivo.length - 1];

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      result: 'error',
      message: `Las extensiones permitidas son ${extensionesValidas.join(', ')}`
    });
  }

  // Nombre unico de archivo
  let nombreFinal = `${id}-${new Date().getMilliseconds()}.${extension}`;

  // Utilice el método mv () para colocar el archivo en algún lugar de su servidor
  sampleFile.mv(`uploads/${tipo}/${nombreFinal}`, (err) => {
    if (err)
      return res.status(500).json({
        result: 'error',
        message: err
      });

    imagenUsuario(id, res, nombreFinal);
  });
});

function imagenUsuario(id, res, nombreArchivo) {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.status(500).json({
        result: 'error',
        message: err
      });
    }

    if (!usuarioDB) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.status(400).json({
        result: 'error',
        message: 'Usuario no existe'
      });
    }

    borrarArchivo(usuarioDB.img, 'usuarios');
    usuarioDB.img = nombreArchivo;

    usuarioDB.save((err, usuarioGuardado) => {
      res.json({
        result: 'success',
        data: usuarioGuardado
      });
    });
  });
}

function borrarArchivo(nombreImagen, tipo) {
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
  }
}

module.exports = app;