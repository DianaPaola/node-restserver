require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.json('Hello World') //si envio send, estoy enviando html, si envio json envio json
})

/*app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
})*/


app.get('/usuario', function(req, res) {
    res.json('get usuario') //si envio send, estoy enviando html, si envio json envio json
})

app.post('/usuario', function(req, res) {

        let body = req.body;

        if (body.nombre === undefined) {
            res.status(400).json({
                ok: false,
                mensaje: 'El nombre es necesario'

            });
        }

        res.json({
            persona: body

        }); //si envio send, estoy enviando html, si envio json envio json


    }) //para crear registros


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id
    res.json({
        id
    }); //si envio send, estoy enviando html, si envio json envio json
}); //para actualizar data


app.delete('/usuario', function(req, res) {
        res.json('delete usuario') //si envio send, estoy enviando html, si envio json envio json
    }) //para actualizar data

/*
app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
})


app.get('/', function(req, res) {
    res.json('Hello World')//si envio send, estoy enviando html, si envio json envio json
})*/

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto", process.env.PORT);
})