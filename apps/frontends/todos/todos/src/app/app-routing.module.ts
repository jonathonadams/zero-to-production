import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class RootAppRoutingModule {}

@NgModule()
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAppRoutingModule
    };
  }
}
