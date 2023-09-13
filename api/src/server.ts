import { fastify } from 'fastify';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/create-transcripton';
import { generateCompletionRoute } from './routes/generate-ai-completetion';
import fastifyCors from '@fastify/cors';

const app = fastify();

const PORT:number = Number(process.env.PORT) || 3333;
const PATH_URL = process.env.PATH_URL || '*';

app.register(fastifyCors, {
  origin: PATH_URL
});

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateCompletionRoute);

app
  .listen({ port: PORT })
  .then(() => console.log(`Server Running at port:${PORT}`));
