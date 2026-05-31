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
import { loggedinGuard } from './guards/loggedin-guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "",
        component: HomeComponent,
        canActivate: [loggedinGuard]
    },
    // ==================================
    // PROJECT
    // ==================================
    {
        path: "projects/new",
        component: ProjectFormComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "projects/:id/edit",
        component: ProjectFormComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "projects/:id",
        component: ProjectDetailComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "projects",
        component: ProjectManyComponent,
        canActivate: [loggedinGuard]
    },
    // ==================================
    // TASK
    // ==================================
    {
        path: "tasks/new",
        component: TaskFormComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "tasks/:id/edit",
        component: TaskFormComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "tasks/:id",
        component: TaskDetailComponent,
        canActivate: [loggedinGuard]
    },
    {
        path: "tasks",
        component: TaskManyComponent,
        canActivate: [loggedinGuard]
    },
    // ==================================
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
