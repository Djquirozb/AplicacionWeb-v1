require('dotenv').config(); //con esto creamos variables de entorno seguras.

const app = require ('./server');
require('./database');



    app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'))
})