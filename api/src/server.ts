import { fastify } from 'fastify';
import { prisma } from './lib/prisma';

const app = fastify();

const PORT:number = Number(process.env.PORT) || 3333;

app.get('/prompts', async () => prisma.prompt.findMany());

app
  .listen({ port: PORT })
  .then(() => console.log(`Server Running at port:${PORT}`));
