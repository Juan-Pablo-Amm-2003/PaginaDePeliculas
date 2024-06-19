const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
        return {
            msg
        };
    });

    if (!errors.isEmpty()) {
        // Generar un script para mostrar alertas de JavaScript
        let alertMessages = errors.array().map(error => `alert("${error.msg}");`).join('\n');
        let responseHtml = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Error de Validación</title>
            </head>
            <body>
                <script>
                    ${alertMessages}
                    // Redirigir a la página anterior después de mostrar las alertas
                    window.history.back();
                </script>
            </body>
            </html>
        `;
        return res.status(400).send(responseHtml);
    }

    next();
};

const validarRegistro = [
    body("username")
        .isLength({ min: 3 })
        .withMessage("El usuario debe tener al menos 3 caracteres"),
    body("email")
        .isEmail()
        .withMessage("El email debe ser válido"),
    body("password")
        .isString().withMessage('La contraseña necesita letras')
        .isLength({ min: 10 }).withMessage('La contraseña debe tener al menos 10 caracteres')
        .matches(/\d/).withMessage('La contraseña debe tener al menos un número')
        .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra'),
    handleValidationErrors
];

module.exports = validarRegistro;
