//esta pagina arranca y carga todo nuestro servidor general
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path'); 
const morgan = require('morgan'); // modulo llamado morgan que se instalo previamente para visulizar lo que le estan pidiendo a mi servidor y verlo en la consola.
const methodOverride = require('method-override'); // esto es un middleware para hacer funcionar el metodo DELET de las notas, (eliminar notas)
const flash = require ('connect-flash'); // modulos necesarios para poder enviar mensajes 
const session = require('express-session'); // modulos necesarios para poder enviar mensajes de ejecucion cuando hay cambio de paginas
const passport = require('passport') // con esto requiero el modulo passport que hace la autenticacion y seguimiento de la session del usuario dentro de la base de datos.

// initializations
const app = express();
require('./config/passport');  // el codigo del middlewares passport que hemos utilizado mas abajo con esto lo importamos 

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs' 
    }    
));
app.set('view engine', '.hbs');

// middlewares es un software que se sitúa entre un sistema operativo y las aplicaciones que se ejecutan en él
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({ // este es el moulo que nos va ayudar a guardar los mensajes de cambios de paginas en el servidor se añadio dentro de un objeto ({ configuraciones})
    secret: 'secret', // esta es una palabra secreta
    resave: true, // confuguraciones por defecto del modulo
    saveUninitialized: true // confuguraciones por defecto del modulo
}));
app.use(passport.initialize()); // el middlewares, tiene que ir despues de session por el usa sus recursos
app.use(passport.session());
app.use(flash());


// Global Variables, variables globales hay que definirlas rutas
app.use((req, res, next) => {
    res.locals.success_msg =req.flash('success_msg'); // esta linea me va a traer el valor actual de a variable flash definida para guardar mensaje de cambio entre paginas
    res.locals.error_msg =req.flash('error_msg'); // Para enrutar el error del mensaje
    res.locals.error =req.flash('error'); // esta es la ruta del mensaje de error de correos ya creado en la base de datos.
    res.locals.user = req.user || null;  // se guarda el usuario en una variable local para poder reutiliarlo, esto con el fin de que el contenido de la base de datos solo lo vean las personas registradas, salga en la pagina o se quite el registro cuando ya estan registrados.
    next();

})

// Routes, rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes')); // este habilita las rutas para notas archivo notes.routes
app.use(require('./routes/users.routes')); // este habilita las rutas para usuarios archivo users.routes

// Static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;