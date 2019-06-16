import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodosFacade } from './+state/todos.facade';
import { TodosService } from './todos.service';
import {
  TodosEntityState,
  initialTodoState,
  todosReducer
} from './+state/todos.reducer';
import { TodoEffects } from './+state/todos.effects';

@NgModule({
  providers: [TodosFacade, TodosService],
  imports: [
    StoreModule.forFeature<TodosEntityState>('todosState', todosReducer, {
      initialState: initialTodoState
    }),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class TodosDataAccessModule {}
