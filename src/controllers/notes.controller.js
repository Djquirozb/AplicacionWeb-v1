const notesCtrl = {}; // esta es la funcion para empezar a definir se llama la funcion const "nombreDeLaFuncion" ={listaDeControladores}
// FUNCIONES CREADAS

const Note = require('../models/Note') //con esto defino la carpeta que requiero del modelo de "adquicicion de datos"

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');  // controlador definido para agregar notas
}; // con res.render renderizo o vinculo a otra pagina creada. 

// este controlador me ayuda acrear nuevas notas 
notesCtrl.createNewNote = async (req, res) => { //el async trabaja con await para decir que esto es un codigo asincrono.
    const { title, description } = req.body; // eso significa q de la peticion quiero el cuerpo o los datos de esa peticion
    const newNote = new Note({ title, description });
    newNote.user = req.user.id; // de cada nueva nota vamos guardar el usuario y el ID.
    await newNote.save();    // esto es para definir que no es una linea asincrona donde el 'await'
    req.flash('success_msg', 'Note agregada Satisfactoriamente'); //con esta funcion del modulo flash guardamos un mensaje en el servidor de cambio de paginas
    res.redirect('/notes')    // controlador definido para que apenas cree la nota, se redirija a las notas
};

// controlador para ver todas las notas.
notesCtrl.renderNotes = async (req, res) => { // el metodo render.Notes es el encargado de hacer una consulta a la base de datos tener encuenta que se usa el parametro async para decirle que es asincrono y trabaja con el await
    const notes = await Note.find({user: req.user.id}).sort({createdAt:'desc'}); // el metodo .find busca todas las notas dentro de una colleccion y la orden interna es que solo muestre las que le pertenecen a cada usuario de la base de datos, y que las organize en orden descendente. 
    res.render('notes/all-notes', { notes }); // eso quiere decir que desde esa carpeta renderise all-notes un archivo se creamos llamado all-notes.hbs
}; // controlador definido para mostrar las notas a los usuarios

//editar notas
notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id); // con esta funcion va a buscar enmongose y editar el id   
    if (note.user != req.user.id) { // esto significa que si la nota es su propiedad user es ! distinta al req.user.id al usuario actual
        req.flash('error_msg', 'No Esta Autorizado o no existe'); // saque esta alerta
        return res.redirect('/notes'); // y redirecciones al usuario a sus notas
    }       
    res.render('notes/edit-note', { note });  // con esto pasamos la nota a la vist, controlador definido para editar las notas mostradas
};

//controlador para actualizar la nota editada.
notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body; // Esto se llama DESTRUCTURING es una funcion de javastric
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    if (note.user != req.user.id) { // esto significa que si la nota es su propiedad user es ! distinta al req.user.id al usuario actual
        req.flash('error_msg', 'No Esta Autorizado o no existe'); // saque esta alerta
        return res.redirect('/notes'); // y redirecciones al usuario a sus notas
    }     
    req.flash('success_msg', 'Note actualizada satisfactoriamente'); // mensaje enviado al servidor cuando se haga una actualizacion
    res.redirect('/notes');    // controlador definido para enviar las notas al servidor
};

//controlador la eliminar las notas
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // Eliminar lo hace directamente moongose, busca por ID y elimina la nota, controlador definido para eliminar las notas.
    if (note.user != req.user.id) { // esto significa que si la nota es su propiedad user es ! distinta al req.user.id al usuario actual
        req.flash('error_msg', 'No Esta Autorizado o no existe'); // saque esta alerta
        return res.redirect('/notes'); // y redirecciones al usuario a sus notas
    }     
    req.flash('success_msg', 'Note Eliminada satisfactoriamente'); // mensaje enviado al servidor cuando se elimine una nota   
    res.redirect('/notes') // se uso el modulo method-override para gestionar la eliminacion y se redirige a notas.
}

module.exports = notesCtrl;  // esta funcion o modulo de expess es para exportar las "notesCtrl" definidas en este archivo cuando sea llamado por otro.