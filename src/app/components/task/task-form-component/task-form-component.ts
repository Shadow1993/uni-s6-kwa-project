import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseForm } from 'app/components/base/base-form/base-form';
import { TaskModel } from 'app/models/task-model';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.scss',
})
export class TaskFormComponent extends BaseForm<TaskModel> {
  protected override service: TaskService = inject(TaskService);
  protected override urlRoute: string = "tasks";
  override entity = new FormGroup({
    projectId: new FormControl(""),
    description: new FormControl(""),
    status: new FormControl(""),
    priority: new FormControl("")
  });
}
