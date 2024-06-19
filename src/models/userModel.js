const imprimiUsuarios = require('../views/imprimirUsuarios.js')
const Escribirusuario = require('../utils/writeDBusers.js')
const leerUsuarios = require('../utils/readDbUsers.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')



class UserModel {
    static async imprimiTodo(){
        const usuarios = await imprimiUsuarios();
        return usuarios;
    }


    static async obtenerUsername(username){
        const usuarios = await leerUsuarios();
        const encontrarUsuario = usuarios.find(usuario => usuario.username === username)
        return encontrarUsuario;        
    }

    static async compararContraseña(contraseñaIngresada, contraseñaGuardada){
        return await bcrypt.compare(contraseñaIngresada, contraseñaGuardada);
    }



    static async nuevoUsuario( {username, email, password}) {
        try {
            const usuarios = await leerUsuarios(); // Lee el archivo de base de datos
            const usuarioExistente = usuarios.find(usuario => usuario.username === username)
            const emailExistente = usuarios.find(usuario => usuario.email === email)
            if(usuarioExistente){
                return false
            }
            if(emailExistente){
                return false
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const nuevoUsuario = {
                id: uuidv4(),
                username: username,
                email: email,
                password: hashedPassword
            };
            
            usuarios.push(nuevoUsuario); // Agrega el nuevo usuario al array existente
            await Escribirusuario(usuarios);
            return true;
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            throw new Error('Error al agregar el usuario');
        }
    }

    static async delete(id){
        try{
            const usuarios = await leerUsuarios();
            const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)
            if(usuarioIndex === -1){
                return false;
            }
            usuarios.splice(usuarioIndex, 1);
            await Escribirusuario (usuarios);
            return true;
        }catch(error){
            console.log("error al eliminar usuario:", error);
        }
    }
}

module.exports = UserModel;
