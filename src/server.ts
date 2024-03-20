import Fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import postgres from "postgres";
const app = Fastify();

app.get("/:code", async (request, reply) => {
  const getLinkSchema = z.object({
    code: z.string(),
  });
    const { code } = getLinkSchema.parse(request.params);

    const result = await sql/*sql*/ `
    SELECT id, original_url
    FROM short_links
    WHERE short_links.code = ${code}`;

    if (result.length === 0) {
        return reply.code(404).send({ message: "Not found" });
    }

    const link = result[0];

    return reply.redirect(301, link.original_url);
});

app.get("/api/links", async (request, reply) => {
  const result = await sql/*sql*/ `
    SELECT *
    FROM short_links
    ORDER BY created_at DESC`;

  return result
});

app.post("/api/links", async (request, reply) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  });
  const { code, url } = createLinkSchema.parse(request.body);

  try {
    const result = await sql/*sql*/ `
  INSERT INTO short_links (code, original_url) 
  VALUES (${code}, ${url}) 
  RETURNING id`;

    const link = result[0];

    return reply.code(201).send({ shortLinkID: link.id });
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code === "23505") {
        return reply.code(400).send({ message: "Code duplication error" });
      }
    }

    console.error(err);
    return reply.code(500).send({ message: "Internal server error" });
  }
});

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("Server started at port 3000");
  });
