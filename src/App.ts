import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';
import routerMember  from './routes/member.routes';
import routerStructure  from './routes/structure.routes';
import routerAuth from './routes/auth.routes';
import multer from "multer";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();

  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(cookieParser());
    this.express.use(express.static(process.cwd() + '/static'));
  }

  private setRoutes(): void {
    this.express.use('/api/auth', routerAuth);
    this.express.use('/api/member', routerMember);
    this.express.use('/api/structure', routerStructure);
  }

}

export default new App().express;
