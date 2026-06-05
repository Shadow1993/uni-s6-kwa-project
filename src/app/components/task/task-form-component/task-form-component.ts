import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseForm } from 'app/components/base/base-form/base-form';
import { ProjectModel } from 'app/models/project-model';
import { priorityReferences, ReferenceModel, statusReferences } from 'app/models/reference-model';
import { TaskModel } from 'app/models/task-model';
import { LoginService } from 'app/services/login/login-service';
import { ProjectService } from 'app/services/project/project-service';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-form-component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.scss',
})
export class TaskFormComponent extends BaseForm<TaskModel> {
  protected override service: TaskService = inject(TaskService);
  protected override urlRoute: string = "tasks";
  private loginService: LoginService = inject(LoginService);
  private projectService: ProjectService = inject(ProjectService);
  override entity = new FormGroup({
    projectId: new FormControl("", Validators.required),
    description: new FormControl(""),
    status: new FormControl(0),
    priority: new FormControl(0),
    userId: new FormControl(this.loginService.getCurrentUser()?.id)
  });

  projects: WritableSignal<ProjectModel[]> = signal([]);
  statusOptions = signal<ReferenceModel[]>(statusReferences.slice(1));
  priorityOptions = signal<ReferenceModel[]>(priorityReferences.slice(1));

  override ngOnInit(): void {
    super.ngOnInit();
    this.projectService.getAll().subscribe((projects: ProjectModel[]) => {
      this.projects.set(projects);
    });
  }

}
