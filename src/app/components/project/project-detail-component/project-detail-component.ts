import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { BaseDetail } from 'app/components/base/base-detail/base-detail';
import { ProjectModel } from 'app/models/project-model';
import { priorityReferences, ReferenceModel, statusReferences } from 'app/models/reference-model';
import { TaskModel } from 'app/models/task-model';
import { ProjectService } from 'app/services/project/project-service';
import { TaskService } from 'app/services/task/task-service';
import { RouterLink } from "@angular/router";
import { ReferencePipe } from 'app/pipes/reference/reference-pipe';

@Component({
  selector: 'app-project-detail-component',
  imports: [MatCardModule, MatButtonModule, DatePipe, MatIconModule, MatTooltip, MatTableModule, MatMenuModule, MatSortModule, RouterLink, ReferencePipe],
  templateUrl: './project-detail-component.html',
  styleUrl: './project-detail-component.scss',
})
export class ProjectDetailComponent extends BaseDetail<ProjectModel> implements AfterViewInit {

  protected override urlRoute: string = "projects";
  protected override service: ProjectService = inject(ProjectService);
  private taskService: TaskService = inject(TaskService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['id', 'userEmail', 'status', 'priority'];
  dataSource = new MatTableDataSource<TaskModel>([]);

  statusOptions = signal<ReferenceModel[]>(statusReferences);
  priorityOptions = signal<ReferenceModel[]>(priorityReferences);

  filterValues = {
    status: 0,
    priority: 0
  };

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    super();

    // Filter matching both status and priority
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
        default:
          return (item as any)[property];
      }
    };

    // When entity is registered from BaseDetail, it will get the tasks
    effect(() => {
      const id = this.entity()?.id;
      if (id !== undefined) {
        this.taskService.getAllByProjectId(id).subscribe((tasks: TaskModel[]) => {
          this.dataSource.data = tasks;
        });
      }
    });
  }

  ngAfterViewInit() {
    // initial sort set
    this.dataSource.sort = this.sort;
    this.sort.active = "id";

    this.sort.direction = 'asc';

    // prevents error and detects sort change
    this.cdr.detectChanges();
  };


  applyFilter(column: 'status' | 'priority', value: number) {
    this.filterValues[column] = value;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

}