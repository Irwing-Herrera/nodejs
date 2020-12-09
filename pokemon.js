const argv = require('./config/yargs-pokemon').argv;
const { listarPokemon } = require('./functions/pokemon');

const comando = argv._[0];

switch (comando) {
  case 'listar':
    listarPokemon(argv.limit)
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
    break;
  case 'buscar':
    break;
  default:
    console.log('Comando no reconocido');
    break;
}