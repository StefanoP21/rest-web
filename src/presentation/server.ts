import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  publicPath?: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  public serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath = 'public', routes } = options;

    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded()); // x-www-form-urlencoded

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
