const mongoose = require('mongoose') // CON EL require 'mongoose' traigo el modulo ala aplicacion

const MONGODB_URI= 'mongodb://localhost/notes-app'

mongoose.connect (MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
   
 
.then(db => console.log('Database is connected'))
.catch (err => console.log(err));



     

