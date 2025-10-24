export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role?: string; // opcional: admin, user, etc.
}
