
const UserModel = require('./userModel.js');

const leer = require('../utils/readDb');
const Escribir = require('../utils/writeDb.js')
const { v4: uuidv4 } = require('uuid');
const imprimiTodos = require('../views/imprimirTodos.js');


class Moviemodel {
    
    static async imprimiTodo(){
        const movies = await imprimiTodos();
        return movies
    }

    static async nuevapeli(data) {
        try {
            const peliculas = await leer(); // Lee el archivo de base de datos
            const nuevaPeli = {
                id: uuidv4(),
                name: data.name,
                categoria: data.categoria
                
            };
            peliculas.push(nuevaPeli); // Agrega la nueva película al array existente
            await Escribir(peliculas)
            return nuevaPeli;
        } catch (error) {
            console.error('Error al agregar la película:', error);
            throw new Error('Error al agregar la película');
        }
    }

    static async delete(id){
        try{
            const movies = await leer();
            const movieindex = movies.findIndex(movie => movie.id === id)
            if(movieindex === -1){
                return false;
            }
            movies.splice(movieindex, 1)
            await Escribir(movies)
            return true
        }catch(error){
            console.log("error al eliminar:", error)
        }
    }
}





module.exports = Moviemodel, UserModel;

