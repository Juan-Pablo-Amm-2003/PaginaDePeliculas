const fs = require('fs');
const path = require('path');
const imprimiUsuarios = require('../views/imprimirUsuarios.js')
const UserModel = require('../models/userModel.js');

const usersFilePathUser = path.join(__dirname, 'data', 'usuarios.json');

class UserController {

    static async imprimiTodo(){
        const usuarios = await imprimiUsuarios();
        return usuarios
    }

    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserModel.imprimiTodo();
            res.send(allUsers);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).send('Error al obtener todos los usuarios');
        }
    }

    static async mostrarFormularioDeRegistro(req, res) { // Corrección en el nombre de la función
        try {
            // Enviar el archivo del formulario al cliente
            await res.sendFile(path.join(__dirname, '../public/register.html'));
        } catch (error) {
            console.error('Error al mostrar el formulario:', error);
            res.status(500).send('Error al mostrar el formulario');
        }
    }

    static async mostrarFormularioDeInicioDeSesion(req, res) { // Corrección en el nombre de la función
        try {
            // Enviar el archivo del formulario al cliente
            await res.sendFile(path.join(__dirname, '../public/login.html'));
        } catch (error) {
            console.error('Error al mostrar el formulario:', error);
            res.status(500).send('Error al mostrar el formulario');
        }
    }

    static async createUser(req, res) {
        try {
            const {username, email, password} = req.body;
            const  result = await UserModel.nuevoUsuario({username, email, password});
            if(result ===  true){
                res.send('Usuario creado correctamente');
            }else{
                res.send("Esa contraseña ya es existente")
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).send('Error al crear usuario');
        }
    }

    static async iniciarSesion( req, res){
        try{
            const {username, password} = req.body;
            const usuario = await UserModel.obtenerUsername(username)
            if(usuario && await UserModel.compararContraseña(password, usuario.password)){
                req.session.userID = usuario.id;
                req.session.isLogged = true;
                res.sendFile(path.join(__dirname, "../public/loginOK.html"))
            }else{
                res.send("Credenciales Invalidas")
            }
        }catch{
            res.send("Error X")
        }

    }

    static async cerrarSesion(req, res) {
        try{
            const isLogged = req.session.isLogged;
            if(!isLogged){
                return res.send("La sesion expiro")
            }
            req.session.destroy(err => {
                if(err){
                    return res.send("error al cerrar sesion")
                }
                res.clearCookie("connect.sid");
                res.send("la sesion cerro exitosamente")
            })
        }catch{
            req.send("Error al cerrar la secion en el server")
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const result = await UserModel.delete(id);
            if (!result) {
                return res.status(404).send('Usuario no encontrado para eliminar');
            }
            return res.send('Usuario eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).send('Error al eliminar usuario');
        }
    }
}

module.exports = UserController;
