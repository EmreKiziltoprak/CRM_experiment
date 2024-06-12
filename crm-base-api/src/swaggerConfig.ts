const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:3307',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
