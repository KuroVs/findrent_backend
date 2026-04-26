const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FindRent API',
            version: '1.0.0',
            description: 'API REST para gestión de propiedades inmobiliarias'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ]
    },
    apis: ['./routes/*.routes.js'] // ← aquí lee los comentarios
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;