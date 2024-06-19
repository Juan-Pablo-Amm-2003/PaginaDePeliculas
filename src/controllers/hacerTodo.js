const fs = require('fs');
const path = require('path');
const UserController = require('./userController'); 
const Moviemodel = require('../models/modelos.js')

class movieControllers {
    static async obtenerTodo(req, res) {
        try {
            // Llamar a la función correspondiente de Moviemodel para obtener todos los datos
            const vertodos = await Moviemodel.imprimiTodo();
            res.send(vertodos);
        } catch (error) {
            console.error('Error al obtener todos los datos:', error);
            res.status(500).send('Error al obtener todos los datos');
        }
    }

    static async mostrarFormulario(req, res) { // Corrección en el nombre de la función
        try {
            // Enviar el archivo del formulario al cliente
            await res.sendFile(path.join(__dirname, '../public/index.html'));
        } catch (error) {
            console.error('Error al mostrar el formulario:', error);
            res.status(500).send('Error al mostrar el formulario');
        }
    }

    static async crearPelicula(req, res) { // Corrección en el nombre de la función
        try {
            // Llamar a la función correspondiente de Moviemodel para crear una película
            const nuevapeli = await Moviemodel.nuevapeli(req.body);
            res.send('Película agregada correctamente');
        } catch (error) {
            console.error('Error al agregar película:', error);
            res.status(500).send('Error al agregar película');
        }
    } 

    static async delete(req, res) {
        const id = req.params.id;
        try {
            // Llamar a la función correspondiente de Moviemodel para eliminar una película
            const resultado = await Moviemodel.delete(id);
            if (resultado === false) {
                return res.status(404).send('Película no encontrada para eliminar');
            }
            return res.send('Película eliminada correctamente');
        } catch(error) {
            console.error('Error al eliminar la película:', error);
            res.status(500).send('Error al eliminar la película');
        }
    }

}

module.exports = movieControllers;
