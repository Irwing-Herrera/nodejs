const fs = require('fs');

let crearArchivo = () => {
  return new Promise((resolve, reject) => {
    let tabla = '';
    const nombreArchivo = 'tabla-multiplicar.txt';

    for (let i = 1; i <= 10; i++) {
      tabla += `Tabla del ${i}\n`;
      for (let j = 0; j <= 10; j++) {
        tabla += `${i} * ${j} = ${i * j}\n`;
      }
      tabla += `======================\n`;
    }

    fs.writeFile(`./assets/txt/${nombreArchivo}`, tabla, (err) => {
      if (err) reject(err);
      else resolve(`Se ha creado el archivo ${nombreArchivo}!`);
    });
  });
}

let mostrarTabla = (tabla, limite) => {
  return new Promise((resolve, reject) => {
    if (!Number(tabla)) {
      reject(`El valor de tabla '${tabla}' no es un numero!`);
    } else if (!Number(limite)) {
      reject(`El valor de limite '${limite}' no es un numero!`);
    }

    let data = '';

    data += `Tabla del ${tabla}\n`.green;
    for (let j = 0; j <= limite; j++) {
      data += `${tabla} * ${j} = ${tabla * j}\n`;
    }

    resolve(data);
  });
}

module.exports = {
  crearArchivo,
  mostrarTabla
}