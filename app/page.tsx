"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Priority } from "@/lib/api";
import { TaskStatsCard } from "@/components/TaskStatsCard";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function HomePage() {
  const queryClient = useQueryClient();

  // 1. Busca as tarefas da API Fastify
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  // 2. Mutation para criar tarefa
  const createMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 3. Mutation para alternar status
  const toggleMutation = useMutation({
    mutationFn: api.toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Cálculo dinâmico de estatísticas vindo do banco
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const handleAddTask = (title: string, priority: string) => {
    createMutation.mutate({
      title,
      priority: priority.toUpperCase() as Priority,
    });
  };

  const handleToggleTask = (id: string, currentStatus: boolean) => {
    toggleMutation.mutate({ id, completed: !currentStatus });
  };

  const updateTitleMutation = useMutation({
    mutationFn: api.updateTaskTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleUpdateTitle = (id: string, title: string) => {
    updateTitleMutation.mutate({ id, title });
  };

  const handleDeleteTask = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Task Manager <span className="text-indigo-500">FULLSTACK</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Conectado ao Fastify + PostgreSQL em tempo real.
            </p>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
            API Online (Porta 3333)
          </span>
        </header>

        {/* Cards de Estatísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TaskStatsCard
            label="Total de Tarefas"
            value={stats.total}
            color="slate"
          />
          <TaskStatsCard
            label="Concluídas"
            value={stats.completed}
            color="emerald"
          />
          <TaskStatsCard
            label="Pendentes"
            value={stats.pending}
            color="amber"
          />
        </section>

        {/* Formulário + Lista */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-semibold text-white">
            Criar Nova Tarefa
          </h2>
          <TaskForm onAddTask={handleAddTask} />

          <hr className="border-slate-800" />

          <h2 className="text-lg font-semibold text-white">Minhas Tarefas</h2>

          {isLoading ? (
            <p className="text-slate-500 text-sm text-center py-8">
              Carregando tarefas do PostgreSQL...
            </p>
          ) : isError ? (
            <p className="text-rose-400 text-sm text-center py-8">
              Erro ao conectar com o servidor Fastify.
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onUpdateTitle={handleUpdateTitle}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </section>
      </div>
    </main>
  );
}
