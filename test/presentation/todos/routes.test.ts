import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../../src/data/postgresql';

beforeAll(async () => {
  await testServer.start();
});

afterAll(async () => {
  testServer.close();
});

beforeEach(async () => {
  await prisma.todo.deleteMany();
});

describe('Testing routes.ts', () => {
  const todos = [{ text: 'Todo test 1' }, { text: 'Todo test 2' }];

  it('should return todos - api/todos', async () => {
    await prisma.todo.createMany({ data: todos });

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body.todos.length).toBe(2);
  });

  it('should return a todo - api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[0] });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body.todo.id).toEqual(todo.id);
  });

  it('should return a 404 NOT FOUND - api/todos/:id', async () => {
    const id = 99;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(404);

    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual({ ok: false, msg: `Todo with id ${id} not found` });
  });

  it('should return a new todo - api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todos[0])
      .expect(201);

    expect(body.newTodo).toEqual({
      id: expect.any(Number),
      text: todos[0].text,
      completedAt: null,
    });
  });

  it('should return an error if text is not present - api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400);

    expect(body).toEqual({ ok: false, msg: 'Text property is required' });
  });

  it('should return an error if text is empty - api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual({ ok: false, msg: 'Text property is required' });
  });
});
