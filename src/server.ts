import Fastify from 'fastify';
import { z } from 'zod';
import { sql } from './lib/postgres';
const app = Fastify();


app.post('/api/links', async (request, reply) => {
    const createLinkSchema = z.object({
        code: z.string().min(3),
        url: z.string().url(),
    });
  const {code , url} = createLinkSchema.parse(request.body);

  const result = await sql /*sql*/`
  INSERT INTO short_links (code, original_url) 
  VALUES (${code}, ${url}) 
  RETURNING id`

  const link = result[0];

  return reply.code(201).send({ shortLinkID: link.id });
});

app.listen({
    port: 3000,
}).then(()=>{
    console.log('Server started at port 3000');
})
