"use client";

import { useState } from "react";
import { TaskApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface TaskListProps {
  tasks: TaskApi[];
  onToggleTask: (id: string, currentStatus: boolean) => void;
  onUpdateTitle: (id: string, newTitle: string) => void;
  onDeleteTask: (id: string) => void;
}

const priorityBadges = {
  LOW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  HIGH: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export function TaskList({
  tasks,
  onToggleTask,
  onUpdateTitle,
  onDeleteTask,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleStartEdit = (task: TaskApi) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = (id: string) => {
    if (editingTitle.trim()) {
      onUpdateTitle(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
        <p className="text-slate-500 text-sm">Nenhuma tarefa cadastrada.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`p-4 bg-slate-950 border rounded-lg flex items-center justify-between transition-all ${
            task.completed
              ? "border-slate-900 opacity-70"
              : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center gap-3 flex-1 mr-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id, task.completed)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
            />

            {editingId === task.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 w-full"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="p-1 text-emerald-400 hover:text-emerald-300"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-slate-400 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span
                className={`text-sm ${
                  task.completed
                    ? "line-through text-slate-500"
                    : "text-slate-200"
                }`}
              >
                {task.title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className={priorityBadges[task.priority]}>
              {task.priority}
            </Badge>

            {/* Botão de Edição */}
            {editingId !== task.id && (
              <button
                onClick={() => handleStartEdit(task)}
                className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                title="Editar título"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}

            {/* Botão de Deletar (Exibido para tarefas concluídas) */}
            {task.completed && (
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                title="Excluir tarefa concluída"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
