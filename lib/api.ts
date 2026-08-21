const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface TaskApi {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // GET /tasks
  getTasks: async (): Promise<TaskApi[]> => {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("Falha ao buscar tarefas");
    const data = await res.json();
    return data.tasks;
  },

  // POST /tasks
  createTask: async (payload: {
    title: string;
    priority: Priority;
  }): Promise<TaskApi> => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Falha ao criar tarefa");
    const data = await res.json();
    return data.task;
  },

  // PATCH /tasks/:id
  toggleTask: async ({
    id,
    completed,
  }: {
    id: string;
    completed: boolean;
  }): Promise<TaskApi> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Falha ao atualizar tarefa");
    const data = await res.json();
    return data.task;
  },

  // PATCH /tasks/:id (Editar Título)
  updateTaskTitle: async ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): Promise<TaskApi> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Falha ao renomear tarefa");
    const data = await res.json();
    return data.task;
  },

  // DELETE /tasks/:id (Remover Tarefa)
  deleteTask: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Falha ao excluir tarefa");
  },
};
