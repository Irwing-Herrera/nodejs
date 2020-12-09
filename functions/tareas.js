const fs = require("fs");

let tareas = [];

const guardarTareas = () => {

  const data = JSON.stringify(tareas);

  fs.writeFile(`./db/data.json`, data, (err) => {
    if (err) throw new Error('Error al guardar el archivo'.red, err);
  });
}

const leerArchivo = () => {
  try {
    tareas = require('../db/data.json');
  } catch (error) {
    tareas = [];
  }
}

const crearTarea = (descripcion) => {
  return new Promise((resolve, reject) => {

    if (String(descripcion).length <= 4) {
      reject(`La tarea tiene menos de 4 caracteres.`);
      return;
    }

    leerArchivo();

    const tareaNueva = {
      descripcion,
      completado: false
    };

    tareas.push(tareaNueva);
    guardarTareas();
    resolve(`Tarea '${descripcion}' agregada a la lista de pendientes.`);
  });
};

const obtenerTareas = () => {
  return new Promise((resolve, reject) => {
    let data = '';

    leerArchivo();
    if (tareas.length === 0) {
      reject(`No se encuentran tareas disponibles.`);
    }

    data += "==== APP DE TAREAS ====\n".yellow;
    for (const tarea of tareas) {
      data += "====== Por Hacer ======\n".green;
      data += tarea.descripcion + '\n';
      data += `Estado: ${tarea.completado} \n`;
    }
    data += "=======================\n".yellow;

    resolve(data);
  });
}

const actualizarTarea = (descripcion, completado = true) => {
  return new Promise((resolve, reject) => {

    leerArchivo();
    if (tareas.length === 0) {
      reject(`No se encuentran tareas disponibles.`);
    }

    tareas.find((tarea) => {
      if (tarea.descripcion === descripcion) {
        tarea.completado = completado;
      }
    });

    guardarTareas();

    resolve(`Tarea '${descripcion}' actualizada.`);
  });
}

const borrarTarea = (descripcion) => {
  return new Promise((resolve, reject) => {

    leerArchivo();
    if (tareas.length === 0) {
      reject(`No se encuentran tareas disponibles.`);
    }

    const index = tareas.findIndex((tarea) => tarea.descripcion === descripcion);

    if (index > -1) {
      tareas.splice(index, 1);
    } else {
      reject(`No existe la tarea '${descripcion}'`.red);
      return;
    }

    guardarTareas();

    resolve(`Tarea '${descripcion}' eliminada.`);
  });
}

module.exports = {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  borrarTarea
}
