import { NgModule } from '@angular/core';
import { RouterFacade } from './+state/router.facade';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router.effects';

@NgModule({
  imports: [EffectsModule.forFeature([RouterEffects])],
  providers: [RouterFacade]
})
export class FrontendDataAccessRouterModule {}
