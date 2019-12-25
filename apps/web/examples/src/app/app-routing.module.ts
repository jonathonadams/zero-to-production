import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class RootAppRoutingModule {}

@NgModule()
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders<RootAppRoutingModule> {
    return {
      ngModule: RootAppRoutingModule
    };
  }
}
