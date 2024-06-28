import { prisma } from '../../data/postgresql';
import {
  CreateTodoDto,
  CustomError,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from '../../domain';

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(newTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    if (todos.length < 1)
      throw new CustomError('Todos not found on database', 404);

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404);

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(deletedTodo);
  }
}
