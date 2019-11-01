import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosOutlineComponent } from './todos-outline/todos-outline.component';

const ROUTES: Routes = [
  {
    path: '',
    component: TodosOutlineComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@ngw/todos/feature-shell').then(
            m => m.TodosFeatureShellModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExamplesTodosRouterModule {}
