const leerUsuarios = require('../utils/readDbUsers');

async function imprimiUsuarios() {
    try {
        const usuarios = await leerUsuarios(); // Obtener todos los usuarios de la base de datos
        let listaDeUsuarios = usuarios.map(usuario => `
            <div class="user-card" data-id="${usuario.id}">
                <div class="user-content">
                    <h4 class="user-username">${usuario.username}</h4>
                    <p class="user-id">ID: ${usuario.id}</p>
                    <p class="user-email">Email: ${usuario.email}</p>
                    <button class="delete-button">Eliminar Usuario</button>
                </div>
            </div>`).join('');

        return `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios</title>
            <link rel="stylesheet" href="/styles.css">
            <style>
                body {
                    background-color: black;
                    color: white;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .main__title {
                    text-align: center;
                    margin: 2rem 0;
                }
                .user-card {
                    background-color: #333;
                    border: 1px solid #444;
                    border-radius: 8px;
                    margin: 1rem 0;
                    padding: 1rem;
                }
                .user-username {
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
                    background-color: darkred;
                }
                footer {
                    text-align: center;
                    margin-top: 2rem;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <h1 class="main__title">Todos los Usuarios</h1>
                <main>
                    ${listaDeUsuarios}
                </main>
            </div>
            <footer>PIE DE PÁGINA</footer>
            <script src="/script.js"></script>
        </body>
        </html>`;
    } catch (err) {
        console.error('Error al leer todos los usuarios:', err);
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
                <h1 class="main__title">Error al cargar los usuarios</h1>
            </div>
            <footer>PIE DE PÁGINA</footer>
        </body>
        </html>`;
    }
}

module.exports = imprimiUsuarios;