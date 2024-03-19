import Fastify from 'fastify';
const app = Fastify();


app.get('/', async (request, reply) => {
  return { hello: 'world' };
  
});

app.listen({
    port: 3000,
}).then(()=>{
    console.log('Server started at port 3000');
})
