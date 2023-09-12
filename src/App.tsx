import { ModeToggle } from '@/components/mode-toggle';
import { Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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

      <main>

      </main>
    </div>
  );
}
