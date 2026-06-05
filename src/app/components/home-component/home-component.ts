import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TaskStatisticComponent } from '../task/task-statistic-component/task-statistic-component';
import { TaskService } from 'app/services/task/task-service';
import { TaskModel } from 'app/models/task-model';

@Component({
  selector: 'app-home-component',
  imports: [TaskStatisticComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  private taskService: TaskService = inject(TaskService);
  tasks: WritableSignal<TaskModel[]> = signal([]);

  ngOnInit(): void {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks.set(tasks);
    })
  }
}
