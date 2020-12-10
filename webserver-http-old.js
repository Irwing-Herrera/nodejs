const http = require('http');

// Cree un proxy de túnel HTTP
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({
    nombre: 'Irwing'
  }));
  res.end();
})
.listen(8080);