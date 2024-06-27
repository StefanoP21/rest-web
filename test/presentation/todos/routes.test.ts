import request from 'supertest';
import { testServer } from '../test-server';

beforeAll(async () => {
  await testServer.start();
});

afterAll(() => {
  testServer.close();
});

describe('Testing routes.ts', () => {
  it('should return todos endpoint', async () => {
    await request(testServer.app).get('/api/todos').expect(200);
  });
});
