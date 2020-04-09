import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { ExamplesHomeComponent } from './home/home.component';

export const EXAMPLES_ROUTES: Routes = [
  {
    path: '',
    component: ExamplesFeatureShellComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: ExamplesHomeComponent,
      },
      {
        path: 'examples',
        loadChildren: () =>
          import('@ztp/examples/live-demos').then(
            (m) => m.ExamplesLiveDemosModule
          ),
        data: { preload: true }, // Preload this route
      },
      {
        path: 'guides',
        loadChildren: () =>
          import('@ztp/examples/guides').then((m) => m.ExamplesGuidesModule),
        data: { preload: true }, // Preload this route
      },
      {
        path: '**',
        redirectTo: 'home', // TODO -> 404 page
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(EXAMPLES_ROUTES)],
  exports: [RouterModule],
})
export class ExamplesFeatureShellRoutingModule {}
