export interface Task {
  id: number;
  title: string;
  description?: string;
  progress: number; // porcentaje de completado
  projectId: number;
  assignedTo?: number; // userId opcional
  status?: "pending" | "in-progress" | "done";
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
