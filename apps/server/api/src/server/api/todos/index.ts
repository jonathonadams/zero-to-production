import { Todo, TodoNote } from './todo.model';
import { createTodosResolver, createTodosRouter } from '@ztp/server/core-data';

export { Todo, TodoNote };

export const todosResolvers = createTodosResolver(Todo, TodoNote);

export const todosRouter = createTodosRouter(Todo, TodoNote);
