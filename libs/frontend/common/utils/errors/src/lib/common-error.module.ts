import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ErrorEffects } from './+state/error-effects';

@NgModule({
  imports: [EffectsModule.forFeature([ErrorEffects])]
})
export class CommonErrorModule {}
