import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureTodosComponent } from './secure-todos/secure-todos.component';

const ROUTES: Routes = [
  {
    path: '',
    component: SecureTodosComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@uqt/todos/feature-shell').then(
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
export class SecureTodosRoutingModule {}
