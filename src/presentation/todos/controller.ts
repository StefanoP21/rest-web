import { Request, Response } from 'express';
import { prisma } from '../../data/postgresql';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    if (todos.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: 'Todos not found',
      });
    }

    return res.status(200).json({
      ok: true,
      todos,
    });
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

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

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.status(200).json({
      ok: true,
      todo,
    });
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updatedTodoDto] = UpdateTodoDto.update({
      ...req.body,
      id,
    });

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: `Todo with id ${id} not found`,
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updatedTodoDto!.values,
    });

    return res.status(200).json({
      ok: true,
      todo: updatedTodo,
    });
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: `Todo with id ${id} not found`,
      });
    }

    const deltedTodo = await prisma.todo.delete({ where: { id } });

    return res.status(200).json({
      ok: true,
      todo: deltedTodo,
    });
  };
}
