import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)]
})
export class DashboardRoutingModule {}
