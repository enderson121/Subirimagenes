const passport  = require('passport'); //nos traemos l apropia biblioteca de passport
// *** ***** req = es la informacion que envia el navegador
// *** ***** res = es la informacion que el servidor envia al navegador


const index = (req,res,next) => {
    res.render('index.ejs', { 
        title : 'Cargar imagenes / Prueba técnica'
    });
 }

const subir = (req,res,next) => {
    //para ello vamos a utilizar la plantillas y mostrar el contenido en el navegador con render
    // no necesitamos colocar ../views/index ya que hemos confiugurado las vistas 
    res.render('subirimagenes.ejs', { 
        title : 'Cargar imagenes / Prueba técnica',
        cabecera : 'Web de captura de imagenes tipo JPG',
        msjfiles : false
    });
 }


 const postlogueo = (req,res,next) => { 
    //AQUI OBTENEMOS EL METODO DE AUTENTICACION
    passport.authenticate('local.signin',{
        successRedirect : '/subir/1',
        failureRedirect : '/',
        failureFlash : true //para poder enviar mensajes flash
    })(req,res,next);
}

 module.exports = {
    index,
    subir,
    postlogueo
 }