const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gerenciador de Arquivos S3 API',
      version: '1.0.0',
      description: 'API para upload de arquivos no AWS S3 com autenticação',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/server.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };