import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getPromptOptions } from '@/services/handleAPI';

export function PromptSelect() {
  const [prompts, setPrompts] = useState<{id:string, title:string}[] | null>(null);

  useEffect(() => {
    async function loadPrompts() {
      const loadedPrompts = await getPromptOptions();
      setPrompts(loadedPrompts);
    }
    loadPrompts();
  }, []);

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.title}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
