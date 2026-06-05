import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { BaseMany } from 'app/components/base/base-many/base-many';
import { ProjectModel } from 'app/models/project-model';
import { ProjectService } from 'app/services/project/project-service';

@Component({
  selector: 'app-project-many-component',
  imports: [MatCardModule, MatButtonModule, DatePipe, MatIconModule, MatTooltip, MatProgressSpinner],
  templateUrl: './project-many-component.html',
  styleUrl: './project-many-component.scss',
})
export class ProjectManyComponent extends BaseMany<ProjectModel> {
  protected override service: ProjectService = inject(ProjectService);
  protected override urlRoute: string = "projects";
}
