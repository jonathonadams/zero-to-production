import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFeatureShellComponent } from './todos-feature-shell.component';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodoFeatureShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@workspace/frontend/dashboard').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(TODOS_ROUTES)]
})
export class TodosFeatureShellRoutingModule {}
