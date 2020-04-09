// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { createReducer, on, Action } from '@ngrx/store';
// import { ITodoNote } from '@ztp/data';

// // 1. define the entity state
// export interface TodoNotesEntityState extends EntityState<ITodoNote> {}

// // 2. Create entity adapter
// export const adapter: EntityAdapter<ITodoNote> = createEntityAdapter<
//   ITodoNote
// >();

// // 3. Define the initial state
// export const initialTodoNoteState: TodoNotesEntityState = adapter.getInitialState();

// export const todoNotesReducer = createReducer(initialTodoNoteState);

// export function reducer(
//   state: TodoNotesEntityState | undefined,
//   action: Action
// ) {
//   return todoNotesReducer(state, action);
// }
