import { createTypeResolver, retrieveUserId } from '@uqt/server/utils';
import { ITodoModel, ITodoDocument } from './todo';
import { ITodoNoteModel } from './notes';
import { createTodoControllers } from './todo.controllers';

export const createTodosResolver = (
  Todo: ITodoModel,
  TodoNote: ITodoNoteModel
) => {
  const baseResolver = createTypeResolver<ITodoDocument>({
    model: Todo,
    name: 'Todo',
    userResourcesOnly: true
  });

  const todoNoteControllers = createTodoControllers(Todo, TodoNote);

  const todoNotesResolver = async (root: any, args: any, ctx: any) => {
    const userId = retrieveUserId(ctx) as string;
    const todoId = args.todoId;
    return todoNoteControllers.todoNotesController(todoId, userId);
  };

  const newTodoNoteResolver = async (root: any, args: any, ctx: any) => {
    const userId = retrieveUserId(ctx) as string;
    const todoId = args.input.todoId;
    const values = args.input;

    return todoNoteControllers.newTodoNoteController(todoId, userId, values);
  };

  const removeTodoNoteResolver = async (root: any, args: any, ctx: any) => {
    const userId = retrieveUserId(ctx) as string;
    const id = args.id;

    return todoNoteControllers.removeTodoNoteController(id, userId);
  };

  baseResolver.Query.allTodoNotes = todoNotesResolver;
  baseResolver.Mutation.newTodoNote = newTodoNoteResolver;
  baseResolver.Mutation.removeTodoNote = removeTodoNoteResolver;
  // field level resolvers
  baseResolver.Todo = {
    notes: todoNoteControllers.todoNotesFieldController
  };

  return baseResolver;
};
