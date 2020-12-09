const opts = {
  tabla: {
    demand: true,
    alias: 't'
  },
  limite: {
    default: 10,
    alias: 'l'
  }
}

const argv = require('yargs')
  .command('listar', 'Imprime en consola las tablas de multiplicar', opts)
  .command('crear', 'Crea un archivo txt de las tablas de multiplicar del 1 al 10')
  .help()
  .argv;


module.exports = {
  argv
}