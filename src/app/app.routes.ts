import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found-component/page-not-found-component';
import { LoginComponent } from './components/login-component/login-component';
import { HomeComponent } from './components/home-component/home-component';
import { ProjectManyComponent } from './components/project/project-many-component/project-many-component';
import { ProjectDetailComponent } from './components/project/project-detail-component/project-detail-component';
import { ProjectFormComponent } from './components/project/project-form-component/project-form-component';
import { TaskManyComponent } from './components/task/task-many-component/task-many-component';
import { TaskDetailComponent } from './components/task/task-detail-component/task-detail-component';
import { TaskFormComponent } from './components/task/task-form-component/task-form-component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    // ==================================
    // PROJECT
    // ==================================
    {
        path: "projects/new",
        component: ProjectFormComponent
    },
    {
        path: "projects/:id/edit",
        component: ProjectFormComponent
    },
    {
        path: "projects/:id",
        component: ProjectDetailComponent
    },
    {
        path: "projects",
        component: ProjectManyComponent
    },
    // ==================================
    // TASK
    // ==================================
    {
        path: "tasks/new",
        component: TaskFormComponent
    },
    {
        path: "tasks/:id/edit",
        component: TaskFormComponent
    },
    {
        path: "tasks/:id",
        component: TaskDetailComponent
    },
    {
        path: "tasks",
        component: TaskManyComponent
    },
    // ==================================
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
