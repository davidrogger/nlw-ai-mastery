import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getPromptOptions } from '@/services/handleAPI';

type Prompt = {
  id: string;
  title: string;
  template: string;
}

type PromptSelectProps = {
  onPromptSelected: (prompt: string) => void;
}

export function PromptSelect(props:PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  function handlePromptSelected(promptId:string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId);

    if (selectedPrompt) {
      props.onPromptSelected(selectedPrompt.template);
    }
  }

  useEffect(() => {
    async function loadPrompts() {
      const loadedPrompts = await getPromptOptions();
      setPrompts(loadedPrompts);
    }
    loadPrompts();
  }, []);

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
