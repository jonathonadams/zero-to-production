import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ExamplesFacade } from './+state/examples.facade';
import {
  ExamplesEntityState,
  reducer,
  initialExampleState
} from './+state/examples.reducer';

@NgModule({
  providers: [ExamplesFacade],
  imports: [
    StoreModule.forFeature<ExamplesEntityState>('examplesState', reducer, {
      initialState: initialExampleState
    })
  ]
})
export class ExamplesDataAccessModule {}
