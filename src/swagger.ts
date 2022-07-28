import { SwaggerOptions } from 'fastify-swagger';

const { API_URL = '', WEBSITE_URL = '' } = process.env;

const swaggerOptions: SwaggerOptions = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Wizmi',
      description: 'API Wizmi - Built in Fastify & Prisma',
      version: '0.1.0',
    },
    externalDocs: {
      url: `https://${WEBSITE_URL}`,
      description: 'Wizmi Website',
    },
    host: API_URL,
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Authentication', description: 'How to authenticate' },
      { name: 'Changelogs', description: 'Changelogs endpoints' },
      { name: 'Feedbacks', description: 'Feedbacks endpoints' },
      { name: 'Levels', description: 'Levels endpoints' },
      { name: 'Releases', description: 'Releases endpoints' },
      { name: 'Users', description: 'Users endpoints' },
      { name: 'Worlds', description: 'Worlds endpoints' },
    ],
    securityDefinitions: {
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
};

export default swaggerOptions;
