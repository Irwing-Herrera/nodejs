const empleados = [
  {
    id: 1,
    nombre: 'Irwing'
  }, {
    id: 2,
    nombre: 'Allison'
  }, {
    id: 1,
    nombre: 'Alexis'
  }
];

const salarios = [
  {
    id: 1,
    salario: 10000
  }, {
    id: 2,
    salario: 20000
  }, {
    id: 3,
    salario: 30000
  }
];

//Callback
//  let getEmpleado = (id, callback) => {
//   let empleadoBD = empleados.find((empleado) => empleado.id === id);

//   if (!empleadoBD) {
//     callback(`No existe el empleado con el ID ${id}`);
//   } else {
//     let salarioBD = salarios.find((salario) => empleadoBD.id === id);

//     let nuevoObjeto = {
//       ...empleadoBD,
//       salario: salarioBD.salario
//     };

//     callback(null, nuevoObjeto);
//   }
// };
// getEmpleado(1, (error, empleado) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Empleado: ', empleado);
//   }
// });



// Promise
let getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoBD = empleados.find((empleado) => empleado.id === id);

    if (!empleadoBD) {
      reject(`No existe el empleado con el ID ${id}`);
    } else {
      let salarioBD = salarios.find((_) => empleadoBD.id === id);

      let nuevoObjeto = {
        ...empleadoBD,
        salario: salarioBD.salario
      };

      resolve(nuevoObjeto);
    }
  });
};


getEmpleado(1).then( (value) => console.log(value), (error) => console.log(error));