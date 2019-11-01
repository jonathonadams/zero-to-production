import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { ExamplesComponent } from './examples/examples.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: 'examples',
    component: ExamplesFeatureShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ExamplesComponent
      },
      {
        path: 'form-builder',
        loadChildren: () =>
          import('@ngw/examples/form-builder').then(
            m => m.ExamplesFormBuilderModule
          )
      },
      {
        path: 'secure',
        loadChildren: () =>
          import('@ngw/examples/todos').then(m => m.ExamplesTodosModule)
      }
    ]
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
