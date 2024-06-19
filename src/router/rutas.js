const express = require('express');
const router = express.Router();
const movieControllers = require('../controllers/hacerTodo.js');


// hasta aca llegamos
router.get("/", movieControllers.obtenerTodo);
router.post("/submit", movieControllers.crearPelicula);
router.delete("/id/:id", movieControllers.delete);




module.exports = router;
