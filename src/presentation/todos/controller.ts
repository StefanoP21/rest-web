import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'buy milk', createdAt: new Date() },
  { id: 2, text: 'buy coffee', createdAt: null },
  { id: 3, text: 'buy bread', createdAt: new Date() },
];

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: `Todo with id ${id} not found`,
      });
    }

    return res.status(200).json({
      ok: true,
      todo,
    });
  };
}
