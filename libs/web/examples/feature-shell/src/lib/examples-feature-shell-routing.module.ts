import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: 'examples',
    component: ExamplesFeatureShellComponent
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('@ngw/todos/feature-shell').then(m => m.TodosFeatureShellModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'examples'
  },
  {
    path: '**',
    redirectTo: 'examples'
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)]
})
export class ExamplesFeatureShellRoutingModule {}
