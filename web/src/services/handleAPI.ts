import { api } from '@/lib/axios';

export async function registerNewVideo(data:FormData) {
  try {
    const response = await api.post('/videos', data);

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function transcriptVideoByIdWithPrompt(videoId:string, prompt:string) {
  try {
    const response = await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}