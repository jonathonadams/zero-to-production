import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FormBuilderCreateRouterModule {}
