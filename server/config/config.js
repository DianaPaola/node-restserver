//process es un obj global corriendo durante toda la aplicacion
//y el process se modifica deacuerdo a cada ambiente


//===============================
//              Puerto
//===============================

process.env.PORT = process.env.PORT || 3000;


//===============================
//              Entorno
//===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===============================
//          Base de datos
//===============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Diana:Kdlqi8QUDE569hzA@cluster0-lcixj.mongodb.net/cafe'
}

process.env.URLDB = urlDB;