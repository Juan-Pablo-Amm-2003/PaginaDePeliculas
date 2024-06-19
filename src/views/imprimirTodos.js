const leer = require('../utils/readDb');

async function imprimiTodos() {
    try {
        const movies = await leer();
        let listadepelis = movies.map(movie => `
            <div class="movie-card" data-id="${movie.id}">
                <div class="movie-content">
                    <h4 class="movie-title">${movie.name}</h4>
                    <p class="movie-id">ID: ${movie.id}</p>
                    <p class="movie-author">Autor: ${movie.autor}</p>
                    <p class="movie-category">Categoría: ${movie.categoria}</p>
                    <button class="delete-button">Eliminar Libro</button>
                </div>
            </div>`).join('');

        return `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Películas</title>
            <link rel="stylesheet" href="/styles.css">
            <style>
                body {
                    background-color: black;
                    color: white;
                    font-family: Arial, sans-serif;
                }
                .wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: red;
                    padding: 1rem;
                }
                .navbar {
                    list-style: none;
                    padding: 0;
                }
                .navbar__item {
                    display: inline;
                    margin-right: 1rem;
                }
                .navbar__item a {
                    color: white;
                    text-decoration: none;
                }
                .main__title {
                    text-align: center;
                    margin: 2rem 0;
                }
                .movie-card {
                    background-color: #333;
                    border: 1px solid #444;
                    border-radius: 8px;
                    margin: 1rem 0;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .movie-title {
                    color: red;
                }
                .delete-button {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background-color: red;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                .delete-button:hover {
                    background-color: white;
                }
                footer {
                    text-align: center;
                    margin-top: 2rem;
                }
            </style>
        </head>
        <body>
        <div class="wrapper">
            <header class="header">
                <nav class="navbar">
                    <ul>
                        <li class="navbar__item"><a href="/movies">Ver Todos las pelis</a></li>
                        <li class="navbar__item"><a href="/">Subir una Pelicula</a></li>
                        <li class="navbar__item"><a href="/user/register">Registrarse</a></li>
                         <li class="navbar__item"><a href="/user/login">Iniciar sesion</a></li>
                    </ul>
                </nav>
            </header>
            <h1 class="main__title">Todas las Pelis</h1>
            <main>
                ${listadepelis}
            </main>
        </div>
        <footer>PIE DE PÁGINA</footer>
        <script src="/script.js"></script>
        </body>
        </html>`;
    } catch (err) {
        console.error('Error al leer todos los libros:', err);
        return `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
        <div class="wrapper">
            <header class="header">CABECERA</header>
            <h1 class="main__title">Error al cargar las pelis</h1>
        </div>
        <footer>PIE DE PÁGINA</footer>
        </body>
        </html>`;
    }
}

module.exports = imprimiTodos;
