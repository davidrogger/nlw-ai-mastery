import { fastify } from 'fastify';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/create-transcripton';
import { generateCompletionRoute } from './routes/generate-ai-completetion';

const app = fastify();

const PORT:number = Number(process.env.PORT) || 3333;

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateCompletionRoute);

app
  .listen({ port: PORT })
  .then(() => console.log(`Server Running at port:${PORT}`));
