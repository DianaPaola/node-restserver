const jwt = require('jsonwebtoken');

//=======================
// Verificar Token
//=======================

let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        //  console.log(token);
        next();
    });
};


//=======================
// Verificar Admin Rol
//=======================

let verificaAdminRol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        console.log(usuario.role);
        next();
    } else {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });

    }
};

module.exports = {

    verificaToken,
    verificaAdminRol
}