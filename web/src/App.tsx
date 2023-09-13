import { ModeToggle } from '@/components/mode-toggle';
import { FileVideo, Github, Upload, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './components/ui/select';
import { Slider } from './components/ui/slider';

export function App() {
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
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='ChatGPT answer...'
              readOnly
            />
            <p
              className='text-sm text-muted-foreground'
            >
              Remember: You can use the
              <span className='text-violet-400'>{' {transciption} '}</span>
              variable in the prompt to add more content to the transcrition from the selected video.
            </p>
          </div>
        </section>
        <aside className='w-80 max-[640px]:m-auto space-y-6'>
          <form
            className='space-y-6'
          >
            <label
              htmlFor="video"
              className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
              <FileVideo className='w-4 h-4' />
              Select a Video
            </label>

            <input type="file" id="video" accept="video/mp4" className='sr-only' />

            <Separator />

            <section
              className='space-y-2'
            >
              <label htmlFor="transcription_prompt">
                Transcription Prompt
              </label>
              <Textarea
                id="trabscription_prompt"
                className='h-20 leading-relaxed resize-none'
                placeholder='Add keywords mentioned in the video by comma (,)'
              />
            </section>

            <Button
              type='submit'
              className='w-full'
            >
              Load Video
              <Upload className='w-4 h-4 ml-2' />
            </Button>
          </form>

          <Separator />

          <form className='space-y-6'>
            <div
              className='space-y-2'
            >
              <label>
                Prompt
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">
                    Youtube Title
                  </SelectItem>
                  <SelectItem value="description">
                    Youtube Description
                  </SelectItem>
                </SelectContent>
              </Select>
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
                defaultValue={[0.5]}
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
