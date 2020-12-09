const { crearArchivo, mostrarTabla } = require('./functions/multiplicar');
const argv = require('./config/yargs').argv;

const comando = argv._[0];

switch (comando) {
  case 'listar':
    mostrarTabla(argv.tabla,argv.limite)
      .then((value) => console.log(value))
      .catch((error) => console.log(error));
    break;
  case 'crear':
    crearArchivo()
      .then((value) => console.log(value.yellow))
      .catch((error) => console.log(error));
    break;
  default:
    console.log('Comando no reconocido');
    break;
}