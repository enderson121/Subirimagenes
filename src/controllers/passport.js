//esta passport permite poder utilizar autenticaciones con redes sociales (facebook, twitter etc)
// y para pooder que funcione require de passport-local
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signin', new LocalStrategy({
    usernameField : 'username', //username es el name del campo input
    passwordField : 'password', //password es el name del campo input  
    passReqToCallback : true 
}, async (req,username,password,done)=>{ //DONe se utiliza para poder que continue con el proceso en localstrategy
    const rows = await (username == 'PruebaProteccion')?1:0;
    
    if(rows > 0 ){
        const validPassword = await (password == '1234')?true:false;//compara la contraseña con la que el digito y la que retorno la consulta
        //se crea este usuario quemado para poder crear el id session y poder serializarlo
        const user = {
            id: 1
          }
        if(validPassword){
            done(null,user);//le mandamos a serializar el usuario quemado
        }else{
            done(null,false); //como no se tiene completo el tema de conexion a BD para crear el id se quema los mensajes etc
        }
    }else{
        return done(null,false); //como no se tiene completo el tema de conexion a BD para crear el id se quema los mensajes etc
    }

}));

//Definicion para serializar el usuario ya que passport exige esto
//para poder autenticar el usuario y guardar la session
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
