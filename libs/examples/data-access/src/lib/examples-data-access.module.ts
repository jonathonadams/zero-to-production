import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromExamples from './+state/examples.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<fromExamples.ExamplesEntityState>(
      fromExamples.exampleEntityStateKey,
      fromExamples.reducer
    ),
  ],
})
export class ExamplesDataAccessModule {}
