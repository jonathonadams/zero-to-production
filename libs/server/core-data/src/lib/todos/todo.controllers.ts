import { notFound, unauthorized } from '@hapi/boom';
import { ITodo } from '@uqt/data';
import { ITodoModel, ITodoDocument } from './todo';
import { ITodoNoteModel } from './notes';

export function createTodoControllers(
  Todo: ITodoModel,
  TodoNote: ITodoNoteModel
) {
  // TODO -> have own resolver for 'notes' field, or pass in 'populate'
  // object to the create resolver factory. Additionally should the fields be read
  // from the AST as to what to query?

  const todoNotesFieldController = async (todo: ITodo) => {
    const newTodo = await Todo.findById(todo.id).populate('notes').exec();

    return newTodo?.notes;
  };

  const todoNotesController = async (todoId: ITodo, userId: string) => {
    const todo = await Todo.findById(todoId).populate('notes').exec();

    if (!todo) throw notFound();
    if (todo.userId.toString() !== userId) throw unauthorized();

    return todo.notes;
  };

  const newTodoNoteController = async (
    todoId: string,
    userId: string,
    values: any
  ) => {
    const todoNote = new TodoNote(values);

    const [updateResult, savedNote] = await Promise.all([
      Todo.findOneAndUpdate(
        { _id: todoId, userId },
        { $push: { notes: todoNote.id } }
      ).exec(),
      todoNote.save(),
    ]);

    return todoNote;
  };

  const removeTodoNoteController = async (id: string, userId: string) => {
    // Populate the 'todoId' field so that we can check parent properties, i.e. userId
    const note = await TodoNote.findById(id).populate('todoId').exec();

    if (!note) throw notFound();

    // the todoId has been populated, so it is the todo document
    const todoId = ((note.todoId as unknown) as ITodoDocument).id;
    const todoUserId = ((note.todoId as unknown) as ITodoDocument).userId.toString();

    // The current user can only delete a note from a todo of their own
    if (todoUserId !== userId) throw unauthorized();

    const [updateResult, removeResult] = await Promise.all([
      Todo.updateOne(
        { _id: todoId, userId },
        { $pullAll: { notes: [id] } }
      ).exec(),
      note.remove(),
    ]);

    // The remove method will remove the id field, but is queryable from the GraphQL schema
    note.id = id;
    // The schema expects an ID for the todoId field, not the populated document
    note.todoId = todoId;

    return note;
  };

  const public_api = {
    todoNotesController,
    todoNotesFieldController,
    newTodoNoteController,
    removeTodoNoteController,
  };

  return public_api;
}
