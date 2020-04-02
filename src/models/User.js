const{Schema, model} = require('mongoose'); 
const bcrypt = require ('bcryptjs');

// esta es una show collections coleccion llamada user creada en mongo
// aqui estamos definiendo la estructura de los ID para almacenar en la base de datos 
const UserSchema = new Schema({
    name: {type: String, required: true},
    email:  {type: String, required: true, unique:true},
    password:  {type: String, required: true}    
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async password => { // esta es la funcion para encriptar la contraseña recibida
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports= model('user', UserSchema);