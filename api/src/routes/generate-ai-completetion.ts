import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { StatusCode } from './status';
import { openai } from '../lib/openai';

export async function generateCompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, template, temperature } = bodySchema.parse(request.body);

    const video = await prisma.video.findFirstOrThrow({
      where: {
        id: videoId,
      }
    });

    if (!video.transcription) {
      return reply
        .status(StatusCode.BAD_REQUEST)
        .send({ error: 'Video transcription not generated yet' });
    }

    const promptMessage = template.replace('{transcription}', video.transcription);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature,
      messages: [
        { role: 'user', content: promptMessage }
      ]
    });

    return response;
  });
}
