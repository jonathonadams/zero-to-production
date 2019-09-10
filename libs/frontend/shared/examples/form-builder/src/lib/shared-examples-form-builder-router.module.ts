import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleCreateFormComponent } from './create/create.component';

const ROUTES: Routes = [
  { path: 'create', pathMatch: 'full', component: ExampleCreateFormComponent },
  {
    path: ':formId/build',
    pathMatch: 'full',
    component: ExampleCreateFormComponent
  },
  {
    path: ':formId/display',
    pathMatch: 'full',
    component: ExampleCreateFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SharedExamplesFormBuilderRouterModule {}
