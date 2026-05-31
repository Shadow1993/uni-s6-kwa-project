import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseForm } from 'app/components/base/base-form/base-form';
import { ProjectModel } from 'app/models/project-model';
import { ProjectService } from 'app/services/project/project-service';

@Component({
  selector: 'app-project-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form-component.html',
  styleUrl: './project-form-component.scss',
})
export class ProjectFormComponent extends BaseForm<ProjectModel> {
  protected override service: ProjectService = inject(ProjectService);
  protected override urlRoute: string = "projects";
  override entity = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    deadline: new FormControl("")
  });
}
