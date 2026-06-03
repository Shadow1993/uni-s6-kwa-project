import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { TaskModel } from 'app/models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService<TaskModel> {
  protected override url: string = "http://localhost:3000/tasks";

  getAllByProjectId(projectId: number) {
    return this.http.get<TaskModel[]>(`${this.url}?projectId=${projectId}&_expand=user`);
  }
}
