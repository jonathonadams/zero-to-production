import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@uqt/todos/feature-shell').then(m => m.TodosFeatureShellModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected'
    })
  ],
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
