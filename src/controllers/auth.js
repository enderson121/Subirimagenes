module.exports = {
    //gracias a que estamos inicializando passport --  passport.session() podemos acceder a metodos que el nos brinda
    // en una ocasion usamos req.loOut que nos permite cerrar la session ahora 
    //para esta ocasion vamos a poder validar con req.isAuthenticated()
    isLoggedIn(req,res,next){
        //SI viene parametros y es 1 quiere decir que viene del logueo
        if(req.params.id == 1){
            return next();
        }else{
            return res.redirect('/');
        }
    },
    isNotLoggedIn(req,res,next){
        if (!req.isAuthenticated()) {
            return next();
        }else{
            return res.redirect('/subir/1');
        }
    }
}