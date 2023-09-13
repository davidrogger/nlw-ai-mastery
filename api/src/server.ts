import { fastify } from 'fastify';
import { getAllPromptsRoute } from './routes/get-all-prompts';

const app = fastify();

const PORT:number = Number(process.env.PORT) || 3333;

app.register(getAllPromptsRoute);

app
  .listen({ port: PORT })
  .then(() => console.log(`Server Running at port:${PORT}`));
