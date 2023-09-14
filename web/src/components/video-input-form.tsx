import { ChangeEvent, FormEvent, useMemo, useState, useRef } from 'react';

import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

import { FileVideo, Upload } from 'lucide-react';

import { convertVideoToAudio } from '@/services/handleVideo';
import { registerNewVideo, transcriptVideoByIdWithPrompt } from '@/services/handleAPI';

enum SubmitVideoStatus {
  WAITING,
  CONVERTING,
  TRANSCRIBING,
  SUCCESS,
}

const displayVideoSubmitStatusMessage = {
  1: 'Converting...',
  2: 'Transcribing...',
  3: 'Success',
};

type VideoInputFormProps = {
  onVideoUploaded: (id:string) => void
}

export function VideoInputForm(props:VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitVideoStatus, setSubmitVideoStatus] = useState<SubmitVideoStatus>(SubmitVideoStatus.WAITING);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  function handleInputVideoFile(event:ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (files) {
      const [video] = files;
      setVideoFile(video);
    }
  }

  async function handleSubmitFileVideo(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;

    if (videoFile) {
      setSubmitVideoStatus(SubmitVideoStatus.CONVERTING);
      const audioFile = await convertVideoToAudio(videoFile);
      const data = new FormData();
      data.append('file', audioFile);

      const { video: { id: videoId } } = await registerNewVideo(data);
      setSubmitVideoStatus(SubmitVideoStatus.TRANSCRIBING);
      await transcriptVideoByIdWithPrompt(videoId, prompt as string);
      props.onVideoUploaded(videoId);

      setSubmitVideoStatus(SubmitVideoStatus.SUCCESS);
    }
  }

  const videoThumb = useMemo(() => {
    if (!videoFile) return null;
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmitFileVideo}
    >
      <label
        htmlFor="video"
        className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
      >
        {videoThumb
          ? (<>
            <video src={videoThumb} controls={false} className='pointer-events-none object-cover h-full w-full' />
          </>)
          : (<>
            <FileVideo className='w-4 h-4' />
              Select a Video
          </>)
        }
      </label>

      <input type="file" id="video" accept="video/mp4" className='sr-only' onChange={handleInputVideoFile} />

      <Separator />

      <section
        className='space-y-2'
      >
        <label htmlFor="transcription_prompt">
                Transcription Prompt
        </label>
        <Textarea
          id="transcription_prompt"
          ref={promptInputRef}
          className='h-20 leading-relaxed resize-none'
          placeholder='Add keywords mentioned in the video by comma (,)'
          disabled={submitVideoStatus !== SubmitVideoStatus.WAITING}
        />
      </section>

      <Button
        type='submit'
        className='w-full data-[success=true]:bg-emerald-400'
        data-success={ submitVideoStatus === SubmitVideoStatus.SUCCESS }
        disabled={submitVideoStatus !== SubmitVideoStatus.WAITING}
      >
        {submitVideoStatus === SubmitVideoStatus.WAITING
          ? (<>
            Load Video
            <Upload className='w-4 h-4 ml-2' />
          </>)
          : displayVideoSubmitStatusMessage[submitVideoStatus]
        }
        
      </Button>
    </form>
  );
}