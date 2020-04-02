const {Schema, model} =  require('mongoose'); 
// modelo de adquisicion de datos, a la base de datos
// esta es una show collections coleccion llamada Note creada en mongo

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        require: true  // esto significa que es requerido que por cada nota que se agrege, se requiera un usuario, en la base de datos.
    }    
}, { timestamps: true}) 

module.exports= model('Note', NoteSchema); // Note es el nombre de la coleccion donde mongodb guarda las notas creadas.
