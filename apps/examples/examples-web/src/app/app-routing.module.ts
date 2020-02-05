import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from '@uqt/shared/data-access/router';

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      initialNavigation: 'enabled',
      preloadingStrategy: SelectivePreloadingStrategyService,
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
