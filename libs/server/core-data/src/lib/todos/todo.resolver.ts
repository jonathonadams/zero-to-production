import { createTypeResolver, swapId } from '@uqt/server/utils';
import { TResolverAuthGuard } from '../interface';
import { ITodoModel, ITodoDocument } from './todo';
import { ITodoNoteModel } from './notes';
import { createTodoControllers } from './todo.controllers';

export const createTodosResolver = (
  Todo: ITodoModel,
  TodoNote: ITodoNoteModel,
  guard: TResolverAuthGuard
) => {
  const baseResolver = createTypeResolver<ITodoDocument>({
    model: Todo,
    name: 'Todo',
    resolverAuthentication: guard,
    userResourcesOnly: true
  });

  const todoNoteControllers = createTodoControllers(Todo, TodoNote);

  const todoNotesResolver = async (root: any, args: any, ctx: any) => {
    const userId = ctx.state.user.sub;
    const todoId = args.todoId;
    return todoNoteControllers.todoNotesController(todoId, userId);
  };

  const newTodoNoteResolver = async (root: any, args: any, ctx: any) => {
    const userId = ctx.state.user.sub;
    const todoId = args.input.todoId;
    const values = args.input;

    return todoNoteControllers.newTodoNoteController(todoId, userId, values);
  };

  const removeTodoNoteResolver = async (root: any, args: any, ctx: any) => {
    const userId = ctx.state.user.sub;
    const id = args.id;

    return todoNoteControllers.removeTodoNoteController(id, userId);
  };

  baseResolver.Query.allTodoNotes = guard(todoNotesResolver);
  baseResolver.Mutation.newTodoNote = guard(newTodoNoteResolver);
  baseResolver.Mutation.removeTodoNote = guard(removeTodoNoteResolver);
  // field level resolvers
  baseResolver.Todo = {
    notes: todoNoteControllers.todoNotesFieldController
  };

  return baseResolver;
};
