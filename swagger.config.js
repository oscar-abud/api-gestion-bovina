const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST — Gestión Bovina',
            version: '1.0.0',
            description: 'API completa para la gestión de ganado. Permite administrar vacas y usuarios con autenticación JWT.',
            contact: {
                name: 'Oscar Palma && Maria Fantini'
            }
        },
        servers: [
            {
                // url: 'http://localhost:3000'
                url: 'https://api-gestion-bovina.onrender.com'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingrese el token JWT obtenido del login'
                }
            }
        },
        tags: [
            {
                name: 'Autenticación',
                description: 'Endpoints para registro y login de usuarios'
            },
            {
                name: 'Vacas',
                description: 'Endpoints para la gestión de vacas'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = specs;