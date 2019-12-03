import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CssThemingComponent } from './css-theming/css-theming.component';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CssThemingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class WebExamplesThemingRouterModule {}
