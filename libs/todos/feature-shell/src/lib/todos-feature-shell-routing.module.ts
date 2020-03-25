import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoggedInGuard } from '@uqt/shared/data-access/auth';
import {
  LoginComponent,
  RegisterComponent,
  AuthComponent,
} from '@uqt/shared/auth/components';
import { AllTodosComponent } from '@uqt/todos/all-todos';
import { TodoDetailComponent } from '@uqt/todos/todo-detail';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { TodoResolver } from '@uqt/todos/data-access';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodoFeatureShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@uqt/shared/dashboard').then((m) => m.SharedDashboardModule),
      },
      {
        path: 'todos',
        children: [
          {
            path: '',
            component: AllTodosComponent,
            pathMatch: 'full',
            data: {
              animation: 'AllTodos',
            },
          },
          {
            path: ':todoId',
            component: TodoDetailComponent,
            pathMatch: 'full',
            resolve: {
              todo: TodoResolver,
            },
            data: {
              animation: 'TodoDetail',
            },
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
    canActivate: [AuthGuard],
    data: {
      animation: 'AppPages',
    },
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [LoggedInGuard],
        data: { animation: 'LoginPage' },
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        data: { animation: 'RegisterPage' },
      },
    ],
    data: {
      animation: 'AuthPages',
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(TODOS_ROUTES)],
})
export class TodosFeatureShellRoutingModule {}
