// en este archivo,  estan definidas todas las rutas que vamos a estar usando para el usuario.
const {Router} = require('express'); // estamos construyendo un enrutador
const router = Router();


const {renderSignUpForm, renderSigninForm, signup, signin, logout} = require('../controllers/users.controller') 
// importar las funciones desde users.controllers, todas las funciones creadas anteriormente. se requieres estas funciones desde esa direccion

router.get('/users/signup', renderSignUpForm); //

router.post('/users/signup', signup); 

// funciones traidas para 
router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;