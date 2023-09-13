import { fastify } from 'fastify';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/create-transcripton';

const app = fastify();

const PORT:number = Number(process.env.PORT) || 3333;

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);

app
  .listen({ port: PORT })
  .then(() => console.log(`Server Running at port:${PORT}`));
