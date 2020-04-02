const {Router} = require('express')
const router = Router();
const{renderIndex, renderAbout } = require('../controllers/index.controller')

router.get('/', renderIndex); // esta ruta renderiza el index

router.get('/about', renderAbout); // esta ruta renderiza el about


module.exports= router;