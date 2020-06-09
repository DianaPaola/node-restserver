require('./config/config');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//librerias que sirven para hacer peticiones post, get, push ,delete
const express = require('express');
const app = express();


//para usar las rutas del usuario y las peticiones
//deberiamos declarar todas las rutas o usar una
// variable para realizar la importación de todas las rutas
/*Enviamos las rutas a index.js para que esté ordenado
app.use(require('./routes/usuario'));
app.use(require('./routes/login'));*/
//las enviamos al index entonces hacemos referencia a las rutas
//Configuración global de rutas
app.use(require('./routes/index'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



/*app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
})*/


/*
app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
})


app.get('/', function(req, res) {
    res.json('Hello World')//si envio send, estoy enviando html, si envio json envio json
})*/



//para conectar mi aplicacion con la base de datos


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {

    if (err) throw err;
    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto", process.env.PORT);
})