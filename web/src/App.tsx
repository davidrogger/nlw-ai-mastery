import { Github, Wand2 } from 'lucide-react';
import { useCompletion } from 'ai/react';

import { useState } from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { VideoInputForm } from '@/components/video-input-form';
import { PromptSelect } from '@/components/prompt-select';

export function App() {
  const [temperature, setTemperature] = useState<number>(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    handleInputChange,
    setInput,
    handleSubmit: handleExecuteSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return (
    <div className="h-min-h-screen flex flex-col">
      <header className="px-6 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <ModeToggle />

          <Separator
            orientation='vertical'
            className='h-6'
          />

          <h1 className='text-xl font-bold'>
            upload.ai
          </h1>

        </div>

        <div className="flex items-center gap-3 max-[640px]:w-1/2 relative">
          <span
            className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden overflow-ellipsis max-[640px]:hover:overflow-visible max-[640px]:hover:absolute max-[640px]:hover:bg-background max-[640px]:hover:whitespace-break-spaces rounded px-3 py-1"
          >
            Desenvolvido com 💟 no NLW da Rocketseat
          </span>

          <Separator
            orientation='vertical'
            className='h-6'
          />

          <Button variant="outline" className='ml-auto'>
            <Github
              className='w-4 h-4 mr-2'
            />
            Github
          </Button>
        </div>
      </header>

      <main className='flex-1 p-6 flex gap-6 max-[640px]:flex-col-reverse'>
        <section
          className='flex flex-col flex-1 gap-4'
        >
          <div
            className='grid grid-rows-2 gap-4 flex-1 max-[640px]:min-h-screen'
          >
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Add IA prompt...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='ChatGPT answer...'
              value={completion}
              readOnly
            />
            <p
              className='text-sm text-muted-foreground'
            >
              Remember: You can use the
              <span className='text-violet-400'>{' {transcription} '}</span>
              variable in the prompt to add more content to the transcription from the selected video.
            </p>
          </div>
        </section>
        <aside className='w-80 max-[640px]:m-auto space-y-6'>

          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form
            className='space-y-6'
            onSubmit={handleExecuteSubmit}
          >
            <div
              className='space-y-2'
            >
              <label>
                Prompt
              </label>

              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div
              className='space-y-2'
            >
              <label>
                Model
              </label>

              <Select
                disabled defaultValue="gpt3.5"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span
                className='block text-sm text-muted-foreground italic'
              >
                {'Soon you\'ll be able to customize this option'}
              </span>
            </div>

            <div
              className='space-y-4'
            >
              <label>
                Temperature
              </label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                defaultValue={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
              <span
                className='block text-sm text-muted-foreground italic leading-relaxed'
              >
                Higher values are more creative, but it can be more inaccurate
              </span>
            </div>

            <Separator />

            <Button
              type="submit"
              className='w-full'
              disabled={isLoading}
            >
              Execute
              <Wand2
                className="w-4 h-4 ml-2"
              />
            </Button>

          </form>
        </aside>
      </main>
    </div>
  );
}
