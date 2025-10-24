export interface Project {
  id: number;
  name: string;
  description?: string;
  progress: number; // porcentaje de avance 0-100
  ownerId?: number; // opcional, usuario dueño del proyecto
  createdAt?: string;
  updatedAt?: string;
}
