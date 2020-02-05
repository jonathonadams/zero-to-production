import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { AboutComponent } from './about/about.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    component: ExamplesFeatureShellComponent,
    children: [
      {
        path: 'about',
        pathMatch: 'full',
        component: AboutComponent
      },
      {
        path: 'examples',
        loadChildren: () =>
          import('@uqt/examples/live-demos').then(
            m => m.ExamplesLiveDemosModule
          ),
        data: { preload: true } // Preload this route
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
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
    redirectTo: 'about' // TODO -> 404 page
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)],
  exports: [RouterModule]
})
export class ExamplesFeatureShellRoutingModule {}
