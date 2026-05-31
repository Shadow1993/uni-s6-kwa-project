import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { ProjectModel } from 'app/models/project-model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<ProjectModel> {
  protected override url: string = "http://localhost:3000/projects";
}
