import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  AuthGuard,
  LoggedInGuard
} from '@workspace/frontend/data-access/auth';
import { AuthUsersResolver } from '@workspace/frontend/data-access/users';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@workspace/frontend/todos/feature-shell').then(
        m => m.TodosFeatureShellModule
      ),
    canActivate: [AuthGuard],
    resolve: {
      user: AuthUsersResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class RootAppRoutingModule {}

@NgModule()
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAppRoutingModule
    };
  }
}
