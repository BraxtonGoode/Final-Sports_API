const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sports API',
    description: 'API for managing sports data',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Volleyball',
      description: 'Operations related to volleyball teams',
    },
    {
      name: 'Soccer',
      description: 'Operations related to soccer teams',
    },
    {
      name: 'Basketball',
      description: 'Operations related to basketball teams',
    },
    {
      name: 'User',
      description: 'Operations related to user management',
    },
    {
      name: 'Authentication',
      description: 'Operations related to user authentication',
    },
  ],
};
const outputFile = './swagger_output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
