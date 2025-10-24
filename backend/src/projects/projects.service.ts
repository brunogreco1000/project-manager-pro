import { Injectable } from '@nestjs/common';

export type Project = {
  id: number;
  name: string;
  progress: number;
};

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    { id: 1, name: 'Proyecto A', progress: 40 },
    { id: 2, name: 'Proyecto B', progress: 70 },
  ];

  findAll(): Project[] {
    return this.projects;
  }
}
