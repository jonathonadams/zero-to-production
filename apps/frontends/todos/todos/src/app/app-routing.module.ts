import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLoginComponent } from '@workspace/frontend/shared/auth';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@workspace/frontend/todos/feature-shell').then(
        m => m.TodosFeatureShellModule
      )
  },
  { path: 'login', pathMatch: 'full', component: CommonLoginComponent }
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
