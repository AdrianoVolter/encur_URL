// routes/index.ts
import Fastify from "fastify";
import linksRoutes from "./routes/index";

const app = Fastify();

linksRoutes(app);

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("Server started at port 3000");
  });
