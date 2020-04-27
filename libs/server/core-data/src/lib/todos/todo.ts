import { Connection, Model, Schema, Document } from 'mongoose';
import { defaultSchemaOptions } from '@ztp/server/utils';
import { ITodo } from '@ztp/data';
import { ITodoNoteDocument } from './notes';

// both keys need to be defined here for circular reference reasons
export const todoDbKey = 'todo';
export const todoNoteDbKey = 'todonote';

export const todoSchema = new Schema<ITodo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    title: String,
    description: String,
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: Date,
    notes: [{ type: Schema.Types.ObjectId, ref: todoNoteDbKey }],
  },
  {
    ...defaultSchemaOptions,
  }
);

// the hook 'findOneAndRemove' must line up with the method that is used
// in the create controllers method
todoSchema.pre('findOneAndRemove', async function (doc) {
  // populate the 'notes' field so that they can be delete in the post hook
  this.populate('notes');
});

todoSchema.post('findOneAndRemove', async function (doc: ITodoDocument) {
  // delete all the associated notes as well
  await Promise.all(
    doc.notes.map((note) => (note as ITodoNoteDocument).remove())
  );
});

export function createTodoModel(con: Connection): ITodoModel {
  return con.model<ITodoDocument, ITodoModel>(todoDbKey, todoSchema);
}

export function getTodoModel(con: Connection): ITodoModel {
  return con.model<ITodoDocument, ITodoModel>(todoDbKey);
}

export interface ITodoDocument extends ITodo, Document {
  id: string;
}

export interface ITodoModel extends Model<ITodoDocument> {}