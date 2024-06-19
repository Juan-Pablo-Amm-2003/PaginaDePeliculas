const express = require('express');
const app = express();
const PORT = 8080;
const router = require('./router/rutas.js');
const path = require('path');
const ruterUser = require('./router/rutasUsuarios.js')
const session = require('express-session')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))


const DURATION= 10* 1000;
app.use(session({
    secret:'mySecretKey',
    saveUninitialized: true,
    resave:false,
    cookie:{
        maxAge: DURATION
    },
}))

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rutas
app.use('/movies', router);
app.use((req,res,next) => {
    console.log(req.session)
    //para que la funcion no se clave en el middleware, lo que esta entre la peticion y respuesta
    next()
})
app.use('/user', ruterUser);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log('Escuchando en el puerto:', PORT);
});
