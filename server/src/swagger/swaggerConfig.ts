import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Network API',
      version: '1.0.0',
      description: 'API documentation for the Social Network project',
    },
    servers: [
      {
        url: 'http://10.10.246.4', 
        description: 'Production server'
      },
      {
        url: 'http://localhost:4000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        accessTokenAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Access token for authorization (without "Bearer " prefix)',
        },
      },
    },
  },
  apis: ['./src/swagger/*.yaml'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;