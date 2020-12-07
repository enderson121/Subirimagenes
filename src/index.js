const express = require('express');
const path      = require('path');
const ejs = require('ejs');
const multer = require('multer'); //se necesita iniciar antes de las rutas para poder que el conosca lo que se esta subiendo
const flash     = require('connect-flash'); //es un modulo qu epermite enviar mensaje atravez de distintas vistas
const session   = require('express-session');//almacena los datos en la memoria del servidor
// lo importo solo para poder ejecutar el archivo principal que hemos creado en src/lib
const passport  = require('passport'); //passport es un middleware

const Proceso = require('./controllers/procesos');

// Iniciaciones
const app = express();
require('./controllers/passport'); // con esto le decimos a el middleware passport que se ejecute aqui

//configuraciones, settings
app.set('port', process.env.PORT || 4000 );//se configura un puerto el cual tengamos definidos si no utilice el 3000
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views' ));// se define donde quedaran las vistas
app.set('view engine', 'ejs');//configuracion del motor de las vistas EJS

// ---------------------------------------------MIDDLEWARES
// son funciones que se ejecuta cada vez que un usuario envie peticiones y se ejecutan antes de llegar a las rutas
//se necesita iniciar antes de las rutas para poder que el conosca lo que se esta subiendo
app.use(express.urlencoded({extended:false})); //urlencoded sirve para aceptar desde los form los datos que envie el usuario
app.use(passport.initialize()); //iniciamos passport necesitamos require('./lib/passport');



const storage = multer.memoryStorage();

const fileFilter = (req,file,cb)=>{
    const ext = /jpg|jpeg/;
    const mimetype = ext.test(file.mimetype);
    const extfile = ext.test(path.extname(file.originalname));
    if(mimetype && extfile){
        return cb(null,true);
    }else{
        return cb('Por favor intenta con otra imagen, el sistema acepta solo imagenes de tipo JPG ',false);
    }

};

const uploads = multer({   storage : storage,fileFilter : fileFilter });

app.post('/postimgsubida', uploads.single('files'),async (req,res,next) => {
    
    await Proceso(req.file,path.join(__dirname,'./public/imgSubidas'), res);
    res.json('Archivo subido correctamente');
 });


//-----------------------------------------------RUTAS
app.use(require('./routes/index.js'));


// Variables globales, global variables
app.use((req,res,next)=>{
    next();
});

//inicio servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor configurado por el puerto ${app.get('port')}`);
});


