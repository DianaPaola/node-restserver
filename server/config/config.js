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
//              Vencimiento del token
//===============================
//60 segundos
//60 min
//24 horas
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;




//===============================
//            sEED O SEMILLA de autenticación validacion de token
//===============================


process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//===============================
//          Base de datos
//===============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI; //Variable de entorno creada en Heroku
}

process.env.URLDB = urlDB;