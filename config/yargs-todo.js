const optsCrear = {
  descripcion: {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea'
  }
}

const optsActualizar = {
  descripcion: {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea'
  },
  completado: {
    default: true,
    alias: 'c',
    desc: 'Estado de la tarea'
  },
}

const argv = require('yargs')
  .command('crear', 'Agregar tarea a la lista', optsCrear)
  .command('actualizar', 'Actualizar una tarea a finalizado', optsActualizar)
  .command('borrar', 'Borrar una tarea', optsCrear)
  .help()
  .argv;

module.exports = {
  argv
}