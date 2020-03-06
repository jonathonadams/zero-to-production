export interface ITodo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  notes: ITodoNote[];
}

export interface ITodoNote {
  id: string;
  todoId: string;
  createdOn: string;
  body: any;
}
