// este es nuestro servidor de users o usuarios.
const usersCtrl = {}; // construimos una constante llamada userCtrol
const passport = require('passport');  // importamos passport 

const User= require('../models/User')

// esta funcion es de transito para llevar al usuario a el formulario
usersCtrl.renderSignUpForm = (req, res) => { //creamos la funcion renderSignUpForm = renderiza el formulario de registro
    res.render('users/signup'); // renderizamos el archivo signup.hbs que contiene el formulario del registro
};

// esta ruta funcion recibe los datos del usuario y confirma las contraseñas siguiendo la logica estipulada.
// controlador de registro a la aplicacion web.
usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password}=req.body; // recibir los datos de los formularios
    if(password != confirm_password) { // este es un filtro de que las contraseñas coinciden
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4) { // este es un filtro de longitud
        errors.push({text: 'la contraseña debe contener al menos 4 caracteres'});
    }
    if (errors.length > 0) { // condicional o filtro que si no hay errores renderiza a esta pagina. 
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
      });

    } else {
       const emailUser = await User.findOne({email: email}); // esta es una funcion asincrona, una vez devueva la busqueda, lo que debuelva se guarda en una constante llamada emailUser
       if(emailUser) { // si encontro correo de usuario
        req.flash('error_msg', 'el email escrito ya esta en uso'); // con  flash mandamos un error describiendo q ya esta en uso.
        res.redirect('/users/signup');
       } else { // condicion de crear nuevo usuario si no esta el correo repetido en la base de datos.
           const newUser = new User({name, email, password});
           newUser.password = await newUser.encryptPassword(password)
           await newUser.save();
           req.flash('success_msg', 'Tu Registro Se realizo Satisfactoriamente');
           res.redirect('/users/signin');
       }
    }

};
// controlador de ingreso a la aplicacion web 
//este va a rendizar un formulario para volver a entrar 

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin'); // // renderizamos el archivo signin.hbs que contiene el formulario de ingreso
};

// esta funcion es para validar los datos enviados de funcion anterior
usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin', // si la autenticacion va mal, se redirecciona a singnin
    successRedirect: '/notes', // si todo va bien se redirecciona al usuario a las notas.
    failureFlash: true

}); // esto validara la autenticacion realizada, esto se basa en el LocalStrategy generado en passport,js


//funcion creada usersCtrol.logout salir de la aplicacion logout, esto se ejecuta cuando cliquean desde navigation.hbs en la pestaña logout
usersCtrl.logout = (req, res) => { 
    req.logout(); // passport elimina los permisos de la base de datos, para que cierren la session.
    req.flash('success_msg', 'Has cerrado tu sesion.'); // flash envia este mensaje en pantalla
    res.redirect('/users/signin'); // se redirecciona a esta pagina.
}

module.exports = usersCtrl;