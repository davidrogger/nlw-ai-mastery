import { ModeToggle } from '@/components/mode-toggle';
import { Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function App() {
  return (
    <div className="h-min-h-screen flex flex-col">
      <header className="px-6 py-3 flex justify-between items-center border-b">
        <h1 className='text-xl font-bold'>
          upload.ai
        </h1>

        <div className="flex items-center gap-3">
          <span className='text-sm text-muted-foreground'>
            Desenvolvido com 💟 no NLW da Rocketseat
          </span>

          <Separator
            orientation='vertical'
            className='h-6'
          />

          <Button variant="outline">
            <Github
              className='w-4 h-4 mr-2'
            />
            Github
          </Button>
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}
