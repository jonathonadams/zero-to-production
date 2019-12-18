import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodosFacade } from './+state/todos.facade';
import { TodosService } from './todos.service';
import { TodosEntityState, reducer } from './+state/todos.reducer';
import { TodoEffects } from './+state/todos.effects';

@NgModule({
  providers: [TodosFacade, TodosService],
  imports: [
    StoreModule.forFeature<TodosEntityState>('todosState', reducer),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class TodosDataAccessModule {}
