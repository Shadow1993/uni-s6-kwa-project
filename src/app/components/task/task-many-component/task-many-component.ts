import { AfterViewInit, ChangeDetectorRef, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { BaseMany } from 'app/components/base/base-many/base-many';
import { findColorReference, priorityReferences, ReferenceModel, statusReferences } from 'app/models/reference-model';
import { TaskModel } from 'app/models/task-model';
import { ReferencePipe } from 'app/pipes/reference/reference-pipe';
import { TaskService } from 'app/services/task/task-service';

@Component({
  selector: 'app-task-many-component',
  imports: [MatButtonModule, MatTableModule, MatIconModule, MatMenuModule, RouterLink, ReferencePipe, MatTooltip, MatMenuModule, MatSortModule],
  templateUrl: './task-many-component.html',
  styleUrl: './task-many-component.scss',
})
export class TaskManyComponent extends BaseMany<TaskModel> implements AfterViewInit {
  protected override service: TaskService = inject(TaskService);
  protected override urlRoute: string = "tasks";
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'projectName', 'userEmail', 'status', 'priority', 'action'];
  dataSource = new MatTableDataSource<TaskModel>([]);

  statusOptions = signal<ReferenceModel[]>(statusReferences);
  priorityOptions = signal<ReferenceModel[]>(priorityReferences);
  findColor = findColorReference;

  filterValues = {
    status: 0,
    priority: 0
  };

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    super();

    // Filter matching both
    this.dataSource.filterPredicate = (data: TaskModel, filter: string) => {
      const searchTerms = JSON.parse(filter);

      // Filter is 0 if not received
      const matchesStatus = searchTerms.status === 0 || data.status === searchTerms.status;
      const matchesPriority = searchTerms.priority === 0 || data.priority === searchTerms.priority;

      return matchesStatus && matchesPriority;
    };

    // Sort for nested properties
    this.dataSource.sortingDataAccessor = (item: TaskModel, property: string): string | number => {
      switch (property) {
        case 'userEmail':
          return item.user?.email?.toLowerCase() ?? '';
        case 'projectName':
          return item.project?.name?.toLowerCase() ?? '';
        default:
          return (item as any)[property];
      }
    };

    // Link together table data to entities signal
    effect(() => {
      this.dataSource.data = this.entities();
    });
  }

  ngAfterViewInit() {
    // initial sort set
    this.dataSource.sort = this.sort;
    this.sort.active = "id";

    this.sort.direction = 'asc';

    // prevents error and detects sort change
    this.cdr.detectChanges();
  }

  applyFilter(column: 'status' | 'priority', value: number) {
    this.filterValues[column] = value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

}
