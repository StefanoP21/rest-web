import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../../src/data/postgresql';

beforeAll(async () => {
  await testServer.start();
});

afterAll(async () => {
  testServer.close();
});

describe('Testing routes.ts', () => {
  const todos = [{ text: 'Todo test 1' }, { text: 'Todo test 2' }];

  it('should return todos api/todos', async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({ data: todos });

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body.todos.length).toBe(2);
  });
});
