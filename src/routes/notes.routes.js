const { Router } = require('express') // este es el modulo en la seccion Router del modulo express
const router = Router() //Con esto defino la constante router

const { 
    renderNoteForm, 
    createNewNote, 
    renderNotes,   // en esta constante lo que hago es traerme de la carpeta 'controllers' y el archivo 
    renderEditForm, // 'notes.controller' estas funciones para usarlas mas abajo.
    updateNote, 
    deleteNote 
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth') // esta funcion es viene de auth.js y es la proteccion de las rutas, para que solo usuarios con permisos puedan usarlas

// New Note
router.get('/notes/add', isAuthenticated, renderNoteForm); // CREAR NOTA, con isAuthenticated verificamos la autenticacion del usuario, antes de que pueda acceder a la funcion.

router.post('/notes/new-note', isAuthenticated, createNewNote); // CREAR NOTA

// Get All Note
router.get('/notes', isAuthenticated, renderNotes)

// Edit Notes editar notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm) // con la funcion .get = OBTENER

router.put('/notes/edit/:id',isAuthenticated, updateNote) //con la funcion .put es ACTUALIZAR

// Delete Notes, Metodo para eliminar
router.delete('/notes/delete/:id', isAuthenticated, deleteNote) // estamos usando el metodo HTTP llamado delete, ya que vamos a eliminar una tarea cuando visitemos esa URL atravez de este metodo.


module.exports = router // esta funcion o modulo de expess es para exportar las "router" definidas en este archivo cuando sea llamado por otro.