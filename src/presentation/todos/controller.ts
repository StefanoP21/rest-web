import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodoController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    if (todos.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: 'Todos not found',
      });
    }

    res.status(200).json({
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

    try {
      const todo = await this.todoRepository.findById(id);

      res.status(200).json({
        ok: true,
        todo,
      });
    } catch (error) {
      res.status(404).json({
        ok: false,
        msg: error,
      });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    const newTodo = await this.todoRepository.create(createTodoDto!);

    res.status(200).json({
      ok: true,
      newTodo,
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

    try {
      const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);

      res.status(200).json({
        ok: true,
        updatedTodo,
      });
    } catch (error) {
      res.status(404).json({
        ok: false,
        msg: error,
      });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    try {
      const deletedTodo = await this.todoRepository.deleteById(id);

      res.status(200).json({
        ok: true,
        todo: deletedTodo,
      });
    } catch (error) {
      res.status(404).json({
        ok: false,
        msg: error,
      });
    }
  };
}
