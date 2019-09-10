import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';

const ROUTES: Routes = [
  { path: '', component: ExamplesComponent },
  {
    path: 'form-builder',
    loadChildren: () =>
      import('@ngw/shared/examples/form-builder').then(
        m => m.SharedExamplesFormBuilderModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ExamplesFeatureShellRoutingModule {}
