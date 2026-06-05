import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { BaseDetail } from 'app/components/base/base-detail/base-detail';
import { TaskModel } from 'app/models/task-model';
import { ReferencePipe } from 'app/pipes/reference/reference-pipe';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-detail-component',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltip, RouterLink, ReferencePipe],
  templateUrl: './task-detail-component.html',
  styleUrl: './task-detail-component.scss',
})
export class TaskDetailComponent extends BaseDetail<TaskModel> {
  protected override urlRoute: string = "tasks";
  protected override service: TaskService = inject(TaskService);
}
