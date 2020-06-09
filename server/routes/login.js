const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        // manejo el error dels servidor y con el return termina la ejecución
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //manejo el error si el usuario no existe
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    usuario: usuarioDB,
                    message: '(Usuario) o contrseña incorrecta'
                }

            });
        }

        // manejo del error si la contraseña termina
        //encripto la contraseña y veo si hace match con la contraseña ya encriptada que tengo en la base

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) no son correctos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        //si la contraseña y el usuario hacen match
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    })
});







module.exports = app;