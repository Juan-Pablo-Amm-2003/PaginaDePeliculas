const express = require('express');
const ruterUser = express.Router();
const UserController = require('../controllers/userController.js');
const validarRegistro = require('../../src/middleworss/validaciones.js')

// Mostrar formulario de registro al acceder a /register (GET)
ruterUser.get("/register", UserController.mostrarFormularioDeRegistro);

// Registrar un nuevo usuario al enviar el formulario (POST)
ruterUser.post("/register", validarRegistro, UserController.createUser);

// Eliminar un usuario por su ID
ruterUser.delete("/:id", UserController.deleteUser);


ruterUser.get("/login", UserController.mostrarFormularioDeInicioDeSesion)
ruterUser.post("/login", UserController.iniciarSesion)
ruterUser.get("/logout", UserController.cerrarSesion)


module.exports = ruterUser;