// esta es la pagina de ayuda para realizar validacion de los usuarios a cada ruta
// segun tengan permisos o no.

const helpers= {};

helpers.isAuthenticated = (req, res, next) =>{ // esta es una funcion
    if (req.isAuthenticated()) { // si el ususuario esta autenticado,         
        return next(); // que continue con lo que estaba haciendo
    }
    req.flash('error_msg', 'No Estas Autorizado');
    res.redirect('/users/signin'); // si no esta autenticado que lo direccione al login  para q pueda ingresar primero
}

module.exports = helpers;