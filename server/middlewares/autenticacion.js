require('../config/config');

var jwt = require('jsonwebtoken');

// =============
// Verificar Token
// =============
let verificarToken = (request, response, next) => {
  let token = request.get('Authorization');

  jwt.verify(token, process.env.SEED, (error, paylod) => {
    if (error) {
      return response.status(401).json({
        result: 'error',
        message: 'Invalid Token.'
      });
    }

    request.usuario = paylod.usuario;
    next();
  });
};

// =============
// Verificar rol de Admin
// =============
let verificarAdminRole = (request, response, next) => {
  let usuario = request.usuario;

  if (usuario.role != 'ADMIN_ROLE') {
    return response.status(401).json({
      result: 'error',
      message: 'El usuario no es administrador.'
    });
  } else {
    next();
  }
};

module.exports = {
  verificarToken,
  verificarAdminRole
}