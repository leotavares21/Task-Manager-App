'use client';

import { TaskApi } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  tasks: TaskApi[];
  onToggleTask: (id: string, currentStatus: boolean) => void;
}

const priorityBadges = {
  LOW: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
  MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
  HIGH: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20',
};

export function TaskList({ tasks, onToggleTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
        <p className="text-slate-500 text-sm">
          Nenhuma tarefa cadastrada. Adicione sua primeira tarefa acima!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => onToggleTask(task.id, task.completed)}
          className={`p-4 bg-slate-950 border rounded-lg flex items-center justify-between cursor-pointer transition-all hover:border-slate-700 ${
            task.completed ? 'border-slate-900 opacity-60' : 'border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {}} // A alteração é tratada pelo onClick do <li>
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span
              className={`text-sm ${
                task.completed ? 'line-through text-slate-500' : 'text-slate-200'
              }`}
            >
              {task.title}
            </span>
          </div>

          <Badge variant="outline" className={priorityBadges[task.priority]}>
            {task.priority}
          </Badge>
        </li>
      ))}
    </ul>
  );
}