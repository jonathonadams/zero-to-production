import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExamplesScrollComponent } from './example-scroll/examples-scroll.component';
import { AboutComponent } from './about/about.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: 'examples',
    component: ExamplesFeatureShellComponent,
    children: [
      {
        path: 'all',
        pathMatch: 'full',
        component: ExamplesComponent
      },
      {
        path: 'scroll',
        pathMatch: 'full',
        component: ExamplesScrollComponent
      },
      {
        path: 'scroll/:scrollRoute',
        pathMatch: 'full',
        component: ExamplesScrollComponent
      },

      // {
      //   path: 'dynamic-form',
      //   component: ExampleDetailComponent,
      //   loadChildren: () =>
      //     import('@uqt/examples/dynamic-form').then(
      //       m => m.WebExamplesDynamicFormModule
      //     )
      // },
      // {
      //   path: 'form-builder',
      //   component: ExampleDetailComponent,
      //   loadChildren: () =>
      //     import('@uqt/examples/form-builder').then(
      //       m => m.WebExamplesFormBuilderModule
      //     )
      // },
      // {
      //   path: 'theming',
      //   component: ExampleDetailComponent,
      //   loadChildren: () =>
      //     import('@uqt/examples/theming').then(m => m.WebExamplesThemingModule)
      // },
      // {
      //   path: 'secure',
      //   component: ExampleDetailComponent,
      //   loadChildren: () =>
      //     import('@uqt/todos/feature-shell').then(
      //       m => m.TodosFeatureShellModule
      //     )
      // }
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about'
  },
  {
    path: '**',
    redirectTo: 'examples'
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)],
  exports: [RouterModule]
})
export class ExamplesFeatureShellRoutingModule {}
