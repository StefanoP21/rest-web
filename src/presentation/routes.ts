import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'buy milk', createdAt: new Date() },
        { id: 2, text: 'buy coffee', createdAt: null },
        { id: 3, text: 'buy bread', createdAt: new Date() },
      ]);
    });

    return router;
  }
}
