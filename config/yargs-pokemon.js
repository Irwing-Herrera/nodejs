const optsListado = {
  limit: {
    default: 10,
    alias: 'l',
    desc: 'Lista los Pokemon solicitados'
  }
}

const argv = require('yargs')
  .command('listar', 'Lista los primeros 10 Pokemon', optsListado)
  .help()
  .argv;

module.exports = {
  argv
}