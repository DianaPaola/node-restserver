//librerias que sirven para hacer peticiones post, get, push ,delete
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hello Diana Local') //si envio send, estoy enviando html, si envio json envio json
})

app.get('/usuario', verificaToken, (req, res) => {

    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email,
    })*/


    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);


    //Usuario.find({ google: true })//para sacar los usuarios que tienen google =true
    Usuario.find({ estado: true }, 'nombre email role estado google img') //definir los campos o propiedades que queremos mostrar
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });
            }
            //Usuario.count({ google: true }, (err, conteo) => {
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            })
        })

    // res.json('get usuario local') //si envio send, estoy enviando html, si envio json envio json



})

app.post('/usuario', [verificaToken, verificaAdminRol], function(req, res) {

        let body = req.body;
        //tenemos el objeto para grabar en la base de datos
        let usuario = new Usuario({

            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), //10 corresponde al numero de vueltas que dará para encriptar y hash sync es que haga la encriptacion de manera sincrona osea en el mismo hilo
            role: body.role

        });

        usuario.save((err, usuarioDB) => {

            if (err) {
                return res.status(400).json({

                    ok: false,
                    err
                })
            }

            // usuario.password = null; // una forma de que no se muestre la contraseña
            res.json({

                ok: true,
                usuario: usuarioDB

            })
        })



        /*        if (body.nombre === undefined) {
                    res.status(400).json({
                        ok: false,
                        mensaje: 'El nombre es necesario'

                    });
                }

                res.json({
                    persona: body

                }); //si envio send, estoy enviando html, si envio json envio json
        */

    }) //para crear registros


app.put('/usuario/:id', [verificaToken, verificaAdminRol], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    // delete body.password;
    // delete body.google;
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        }); //si envio send, estoy enviando html, si envio json envio json


    })

}); //para actualizar registros


app.delete('/usuario/:id', [verificaToken, verificaAdminRol], function(req, res) {

        let id = req.params.id;
        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {//eliminar fisicamente un registro
        let cambiaEstado = {
            estado: false
        }
        Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => { //eliminar fisicamente un registro

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });

            };

            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }

                });

            }


            res.json({
                status: true,
                usuario: usuarioBorrado
            })

        })

        // res.json('delete usuario') //si envio send, estoy enviando html, si envio json envio json
    }) //para actualizar data

module.exports = app;