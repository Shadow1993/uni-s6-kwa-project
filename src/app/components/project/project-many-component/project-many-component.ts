import { Component, inject } from '@angular/core';
import { BaseMany } from 'app/components/base/base-many/base-many';
import { ProjectModel } from 'app/models/project-model';
import { ProjectService } from 'app/services/project/project-service';

@Component({
  selector: 'app-project-many-component',
  imports: [],
  templateUrl: './project-many-component.html',
  styleUrl: './project-many-component.scss',
})
export class ProjectManyComponent extends BaseMany<ProjectModel> {
  protected override service: ProjectService = inject(ProjectService);
  protected override urlRoute: string = "projects";
}
