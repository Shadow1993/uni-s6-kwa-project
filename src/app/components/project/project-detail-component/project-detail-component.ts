import { Component, inject } from '@angular/core';
import { BaseDetail } from 'app/components/base/base-detail/base-detail';
import { ProjectModel } from 'app/models/project-model';
import { ProjectService } from 'app/services/project/project-service';

@Component({
  selector: 'app-project-detail-component',
  imports: [],
  templateUrl: './project-detail-component.html',
  styleUrl: './project-detail-component.scss',
})
export class ProjectDetailComponent extends BaseDetail<ProjectModel> {
  protected override service: ProjectService = inject(ProjectService);
}
