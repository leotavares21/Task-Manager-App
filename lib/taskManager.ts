// src/lib/taskManager.ts
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<TaskPriority, number>;
}

export const createTask = (title: string, priority: TaskPriority): Task => {
  return {
    id: Date.now(),
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };
};

export const toggleTaskStatus = (tasks: Task[], id: number): Task[] => {
  return tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
};

export const getTaskStats = (tasks: Task[]): TaskStats => {
  return tasks.reduce<TaskStats>(
    (acc, task) => {
      acc.total += 1;
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.pending += 1;
      }
      acc.byPriority[task.priority] += 1;
      return acc;
    },
    {
      total: 0,
      completed: 0,
      pending: 0,
      byPriority: { low: 0, medium: 0, high: 0 },
    }
  );
};