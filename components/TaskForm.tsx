'use client';

import { useState } from 'react';
import { TaskPriority } from '@/lib/taskManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskFormProps {
  onAddTask: (title: string, priority: TaskPriority) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title, priority);
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="text"
        placeholder="Digite o título da nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
      />

      <Select
        value={priority}
        onValueChange={(value) => setPriority(value as TaskPriority)}
      >
        <SelectTrigger className="w-full sm:w-[200px] bg-slate-950 border-slate-800 text-slate-100">
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
          <SelectItem value="low">Baixa Prioridade</SelectItem>
          <SelectItem value="medium">Média Prioridade</SelectItem>
          <SelectItem value="high">Alta Prioridade</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium cursor-pointer shadow-lg shadow-indigo-600/20"
      >
        Adicionar
      </Button>
    </form>
  );
}