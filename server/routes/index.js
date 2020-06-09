//traemos todas las importaciones de las rutas
//del archivo server.js

const express = require('express');
const app = express();

//aqui están todas nuestras rutas, este archivo es llamado desde el server.js
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;