import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { TaskModel } from 'app/models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService<TaskModel> {
  protected override url: string = "http://localhost:3000/tasks";
}
