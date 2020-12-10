const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Mostrar una pagina html al acceder al servidor
app.use(express.static(__dirname + '/public'));

// Mandar a llamar la peticion con /
app.get('/', function (req, res) {
  res.send({
    nombre: 'Irwing Herrera',
    edad: 25
  })
})

app.listen(port, () => {
  console.log(`Escuchando puerto ${port}`);
})