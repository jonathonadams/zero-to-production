import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTodos from './+state/todos.reducer';
import { TodoEffects } from './+state/todos.effects';

@NgModule({
  imports: [
    StoreModule.forFeature<fromTodos.TodosEntityState>(
      fromTodos.todosFeatureKey,
      fromTodos.reducer
    ),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class TodosDataAccessModule {}
