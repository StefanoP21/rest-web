import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import {
  CreateTodo,
  CustomError,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from '../../domain';

export class TodoController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        msg: error.message,
      });
    }

    res.status(500).json({
      ok: false,
      msg: `Internal server error: ${error}`,
    });
  };

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) =>
        res.status(200).json({
          ok: true,
          todos,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) =>
        res.status(200).json({
          ok: true,
          todo,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((newTodo) =>
        res.status(201).json({
          ok: true,
          newTodo,
        })
      )
      .catch((error) =>
        res.status(400).json({
          ok: false,
          msg: error,
        })
      );
  };

  public updateTodo = (req: Request, res: Response) => {
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

    new UpdateTodo(this.todoRepository)
      .execute(updatedTodoDto!)
      .then((updatedTodo) =>
        res.status(200).json({
          ok: true,
          updatedTodo,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        msg: 'Id argument is not a number',
      });
    }

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((deletedTodo) =>
        res.status(200).json({
          ok: true,
          deletedTodo,
        })
      )
      .catch((error) => this.handleError(res, error));
  };
}
