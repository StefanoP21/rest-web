import { Request, Response } from 'express';

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
      { id: 1, text: 'buy milk', createdAt: new Date() },
      { id: 2, text: 'buy coffee', createdAt: null },
      { id: 3, text: 'buy bread', createdAt: new Date() },
    ]);
  };
}
