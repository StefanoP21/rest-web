import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'buy milk', completedAt: new Date() },
  { id: 2, text: 'buy coffee', completedAt: null },
  { id: 3, text: 'buy bread', completedAt: new Date() },
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

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        ok: false,
        msg: 'Text property is required',
      });
    }

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };

    todos.push();

    return res.status(200).json({
      ok: true,
      todo: newTodo,
    });
  };

  public updateTodo = (req: Request, res: Response) => {
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

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;

    completedAt === 'null'
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    return res.status(200).json({
      ok: true,
      todo,
    });
  };
}
