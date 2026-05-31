import { Component, inject } from '@angular/core';
import { BaseDetail } from 'app/components/base/base-detail/base-detail';
import { TaskModel } from 'app/models/task-model';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-detail-component',
  imports: [],
  templateUrl: './task-detail-component.html',
  styleUrl: './task-detail-component.scss',
})
export class TaskDetailComponent extends BaseDetail<TaskModel> {
  protected override service: TaskService = inject(TaskService);
}
