import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AUTH_ROUTES } from '@ngw/frontend/data-access/auth';
import { AuthUsersResolver } from '@ngw/frontend/data-access/users';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@ngw/frontend/todos/feature-shell').then(
        m => m.TodosFeatureShellModule
      ),
    canActivate: [AuthGuard],
    resolve: {
      user: AuthUsersResolver
    },
    data: {
      animation: 'AppPages'
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
