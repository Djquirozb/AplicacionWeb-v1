// funcion de loguin de usuario, y confirmacion si esta en la base de datos.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); // se importa el modelo de usuario porque user puede interactuar con la base de datos

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // vamos a comprobar si coincide el correo de usuario.
    const user = await User.findOne({ email }) // vamos a buscar por email dentro de la base de datos, y si esto conicide vamos a obtener una respuesta
    if (!user) { // si he buscado un usuario y no existe
        return done(null, false, { message: 'Not User Found' }); // cancelo la funcion con return e inicio la funcion done.
    } else {
        // math password user, con este modulo si el usuario existe, vamos a validas la contraseña.
        const match = await user.matchPassword(password); // esto lo que ara es comparar la contraseña en la base de datos, con la que el usuario nos esta pasando matchPassword(password)
        // si coincide vamos a guardarlas en una constante llamada match
        if (match) {  //ejecucion de la validacion
            return done(null, user); // con esto el modulo passport instalado, va acomprovar si el usuario tiene validacion en cada pagina, para saber si el la session correcta.

        } else {
            return done(null, false, { message: 'clave incorrecta' }); // esto se ejecuta si no esta autenticado en la session.
        }
    }
}));

// cosas que passport utiliza para guardar al usuario en la session de nuestro servidor.
passport.serializeUser((user, done) => { // este metodo de passport recibi una funcion
    done(null, user.id); // con esto va a guardar el usuario, con error null y el id del usuario
});

// esta funcion es para deserielizar al usuario, con esta funcion verificamos se el ID tiene autorizacion
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});