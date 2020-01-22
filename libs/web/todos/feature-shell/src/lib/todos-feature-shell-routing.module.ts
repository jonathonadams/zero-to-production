import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';
import { TodoLayoutComponent } from './ui/todos-layout.component';
import { AuthGuard, LoggedInGuard } from '@uqt/data-access/auth';
import { AuthUsersResolver } from '@uqt/data-access/users';
import {
  LoginComponent,
  RegisterComponent,
  AuthComponent
} from '@uqt/web/common/ui/auth';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodoFeatureShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@uqt/dashboard').then(m => m.DashboardModule),
        data: { animation: 'DashBoardPage' }
      },
      {
        path: 'todos',
        children: [
          {
            path: '',
            component: TodoLayoutComponent,
            pathMatch: 'full'
          },
          {
            path: ':todoId',
            component: TodoLayoutComponent
          }
        ],
        data: { animation: 'TodosPage' }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ],
    canActivate: [AuthGuard],
    resolve: {
      user: AuthUsersResolver
    },
    data: {
      animation: 'AppPages'
    }
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
        data: { animation: 'LoginPage' }
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        data: { animation: 'RegisterPage' }
      }
    ],
    data: {
      animation: 'AuthPages'
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(TODOS_ROUTES)]
})
export class TodosFeatureShellRoutingModule {}
