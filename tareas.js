const argv = require('./config/yargs-todo').argv;
const { crearTarea, obtenerTareas, actualizarTarea, borrarTarea } = require('./functions/tareas');
const colors = require('colors');

const comando = argv._[0];

switch (comando) {
  case 'crear':
    crearTarea(argv.descripcion)
      .then((value) => console.log(value.green))
      .catch((error) => console.log(error.red));
    break;
  case 'listar':
    obtenerTareas()
      .then((value) => console.log(value.green))
      .catch((error) => console.log(error.red));
    break;
  case 'actualizar':
    actualizarTarea(argv.descripcion, argv.completado)
      .then((value) => console.log(value.green))
      .catch((error) => console.log(error.red));
    break;
  case 'borrar':
    borrarTarea(argv.descripcion)
      .then((value) => console.log(value.green))
      .catch((error) => console.log(error.red));
    break;
  default:
    console.log('Comando no reconocido');
    break;
}