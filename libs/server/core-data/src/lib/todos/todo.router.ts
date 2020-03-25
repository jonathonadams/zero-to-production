import { generateRestRouter, retrieveUserId } from '@uqt/server/utils';
import { ITodoModel, ITodoDocument } from './todo';
import { createTodoControllers } from './todo.controllers';
import { ITodoNoteModel } from './notes';
import { ParameterizedContext } from 'koa';

export const createTodosRouter = (
  Todo: ITodoModel,
  TodoNote: ITodoNoteModel
) => {
  const router = generateRestRouter<ITodoDocument>({
    model: Todo,
    userResourcesOnly: true
  });

  const todoNoteControllers = createTodoControllers(Todo, TodoNote);
  const notesControllers = async (ctx: ParameterizedContext) => {
    const todoId = ctx.state.id;

    ctx.status = 200;
    ctx.body = await todoNoteControllers.todoNotesFieldController({
      id: todoId
    } as ITodoDocument);
  };

  const newNoteController = async (ctx: ParameterizedContext) => {
    const todoId = ctx.state.id;
    const userId = retrieveUserId(ctx) as string;
    const { body } = ctx.request;
    body.todoId = todoId;

    ctx.status = 201;
    ctx.body = await todoNoteControllers.newTodoNoteController(
      todoId,
      userId,
      body
    );
  };

  const removeNoteController = async (ctx: ParameterizedContext) => {
    const noteId = ctx.state.noteId;
    const userId = retrieveUserId(ctx) as string;

    ctx.status = 200;
    ctx.body = await todoNoteControllers.removeTodoNoteController(
      noteId,
      userId
    );
  };

  const noteIdParam = async (
    id: string,
    ctx: ParameterizedContext,
    next: () => Promise<any>
  ) => {
    ctx.state.noteId = id;
    await next();
  };

  router.param('noteId', noteIdParam);
  router.get('/:id/notes', notesControllers);
  router.post('/:id/notes', newNoteController);
  router.delete('/:id/notes/:noteId', removeNoteController);

  return router;
};
