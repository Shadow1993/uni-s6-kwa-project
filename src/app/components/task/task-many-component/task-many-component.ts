import { Component, inject } from '@angular/core';
import { BaseMany } from 'app/components/base/base-many/base-many';
import { TaskModel } from 'app/models/task-model';
import { BaseService } from 'app/services/base/base-service';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-many-component',
  imports: [],
  templateUrl: './task-many-component.html',
  styleUrl: './task-many-component.scss',
})
export class TaskManyComponent extends BaseMany<TaskModel> {
  protected override service: TaskService = inject(TaskService);
  protected override urlRoute: string = "tasks";
}
