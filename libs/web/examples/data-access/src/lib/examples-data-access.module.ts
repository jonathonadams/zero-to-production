import { NgModule } from '@angular/core';
import { ExamplesFacade } from './+state/examples.facade';
import { StoreModule } from '@ngrx/store';
import { reducer, ExamplesEntityState } from './+state/examples.reducer';

@NgModule({
  providers: [ExamplesFacade],
  imports: [
    StoreModule.forFeature<ExamplesEntityState>('examplesState', reducer)
  ]
})
export class ExamplesDataAccessModule {}
