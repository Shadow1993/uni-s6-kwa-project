import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { priorityReferences, statusReferences } from 'app/models/reference-model';
import { TaskModel } from 'app/models/task-model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-task-statistic-component',
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './task-statistic-component.html',
  styleUrl: './task-statistic-component.scss',
})
export class TaskStatisticComponent {

  @Input()
  tasksInput = signal<TaskModel[]>([]);

  // Pie
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'left' },
    }
  };
  public pieChartData = computed<ChartData<'pie'>>(() => {
    const tasks = this.tasksInput();
    const validStatuses = statusReferences.slice(1);

    const labels = validStatuses.map(s => s.label);
    const data = validStatuses.map(status =>
      tasks.filter(task => task.status === status.id).length
    );

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [validStatuses[0].color, validStatuses[1].color, validStatuses[2].color],
      }]
    };
  });

  // Bar
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { display: false }
    }
  };

  public barChartData = computed<ChartData<'bar'>>(() => {
    const tasks = this.tasksInput();
    const validPriorities = priorityReferences.slice(1);

    const labels = validPriorities.map(p => p.label);
    const data = validPriorities.map(priority =>
      tasks.filter(task => task.priority === priority.id).length
    );

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [validPriorities[0].color, validPriorities[1].color, validPriorities[2].color],
      }]
    };
  });
}
