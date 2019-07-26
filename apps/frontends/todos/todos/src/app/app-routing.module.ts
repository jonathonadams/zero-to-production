import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AUTH_ROUTES } from '@workspace/frontend/data-access/auth';
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
  ...AUTH_ROUTES
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
