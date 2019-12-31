import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExamplesDemosComponent } from './example-demos/examples-demos.component';
import { AboutComponent } from './about/about.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: 'about',
    pathMatch: 'full',
    component: ExamplesFeatureShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AboutComponent
      }
    ]
  },
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
        path: 'demos',
        component: ExamplesDemosComponent,
        children: [
          {
            path: 'secure',
            loadChildren: () =>
              import('@uqt/web/examples/secure-todos').then(
                m => m.WebExamplesSecureTodosModule
              )
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ]
  },
  {
    // TODO -> This is only for testing
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@uqt/examples/form-builder').then(
        m => m.WebExamplesFormBuilderModule
      )
  },
  {
    path: '**',
    redirectTo: 'about' // TODO -> 404 page
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)],
  exports: [RouterModule]
})
export class ExamplesFeatureShellRoutingModule {}
