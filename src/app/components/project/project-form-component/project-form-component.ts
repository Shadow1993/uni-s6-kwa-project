import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseForm } from 'app/components/base/base-form/base-form';
import { ProjectModel } from 'app/models/project-model';
import { LoginService } from 'app/services/login/login-service';
import { ProjectService } from 'app/services/project/project-service';

@Component({
  selector: 'app-project-form-component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  providers: [],
  templateUrl: './project-form-component.html',
  styleUrl: './project-form-component.scss',
})
export class ProjectFormComponent extends BaseForm<ProjectModel> {
  protected override service: ProjectService = inject(ProjectService);
  protected override urlRoute: string = "projects";
  private loginService: LoginService = inject(LoginService);
  override entity = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
    deadline: new FormControl(""),
    userId: new FormControl(this.loginService.getCurrentUser()?.id)
  });

}
