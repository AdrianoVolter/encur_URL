// routes/links.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { sql } from "../lib/postgres";
import postgres from "postgres";
import { redis } from "../lib/redis";

export default async function linksRoutes(app: FastifyInstance) {
  app.get("/:code", async (request: FastifyRequest, reply: FastifyReply) => {
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

    await redis.zIncrBy("hits", 1, String(link.id));

    return reply.redirect(301, link.original_url);
  });

  app.get(
    "/api/links",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await sql/*sql*/ `
      SELECT *
      FROM short_links
      ORDER BY created_at DESC`;

      return result;
    }
  );

  app.post(
    "/api/links",
    async (request: FastifyRequest, reply: FastifyReply) => {
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
    }
  );

  app.get(
    "/api/metrics",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const result = await redis.zRangeByScoreWithScores("hits", 0, 50);

      const metrics = result
        .sort((a, b) => b.score - a.score)
        .map((item) => {
          return {
            shortLinkID: item.value,
            hits: item.score,
          };
        });
      return metrics;
    }
  );
}
