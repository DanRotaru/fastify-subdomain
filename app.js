// app.js

const fastify = require('fastify')({ logger: true });

// Declare a route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello, Fastify!' };
});

fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: /.*\.localhost:3000/ }, // will match any subdomain of fastify.dev
  handler: function (request, reply) {
    reply.send({'hello world from ': request.headers.host})
  }
})

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
