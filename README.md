# Node Js
Contiene varias app dentro de este mismo proyecto
## Multiplicar Console App
Archivo: tabla.js

Esta es una aplicacion para generar archivo de tabla de
multiplicar de 1 al 10

```
npm run listar
npm run crear
```

## Administrador de tareas Console App
Archivo: tareas.js

Esta es una aplicacion para administrar tareas

```
npm run listar-tareas
npm run agregar-tarea
npm run actualizar-tarea
npm run borrar-tarea
```

## Pokedex Console App
Archivo: pokemon.js

Esta es una aplicacion para pokedex

```
npm run pokedex
```

## Node js Express HTTP Heroku
Archivo: server.js

Esta aplicacion es un servidor que mustra una pagina web sencilla y esta desplegada en Heroku

Desplegar en Heroku:

```
"start": "node server.js"  // Agregar en scripts para que este sea el primero que se despliegue en Heroku
heroku login
heroku git:remote -a irwing-nodejs
git push heroku master
heroku open // https://irwing-nodejs.herokuapp.com/
```

## REST Server Docker MongoDB
Archivo: restserver.js

Instalacion de MongoDB en docker:
```
docker images                // Saber si tienes la imagen de mongo
docker pull mongo:latest     // Instalar la imagen de mongo en su ultima version
```

Creacion de folder de mongo en docker
```
mkdir mongodb-docker
cd mongodb-docker/
```

Correr Mongo en Docker:
```
docker run -d -p 2717:27017 -v ~/mongodb-docker:/data/db --name mymongo mongo:latest
docker ps
docker exec -it mymongo bash              // Acceder a linea de comandos de mongo
> show dbs                                // Mostrar BDs
```

Desplegar en Heroku:

```
"start": "node server/serve.js"  // Agregar en scripts para que este sea el primero que se despliegue en Heroku
heroku login
heroku git:remote -a irwing-express-mongo
git push heroku master
heroku open // https://irwing-express-mongo.herokuapp.com/
```
## Comandos

Ejecutar este comando

```
npm install
```