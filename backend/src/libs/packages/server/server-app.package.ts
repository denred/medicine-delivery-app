import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import cors from 'cors';
import express, {
  type Express,
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express';
import { createValidator } from 'express-joi-validation';
import swaggerUi from 'swagger-ui-express';

import { type ValidationError } from '~/libs/exceptions/exceptions.js';

import { type IConfig } from '../config/config.js';
import { type IDatabase } from '../database/database.js';
import { HttpCode } from '../http/http.js';
import { type ILogger } from '../logger/logger.js';
import {
  type IServerApp,
  type IServerAppApi,
} from './libs/interfaces/interfaces.js';
import { type ExpressRouteParameters } from './libs/types/types.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
  database: IDatabase;
  apis: IServerAppApi[];
};

class ServerApp implements IServerApp {
  private config: IConfig;

  private logger: ILogger;

  private database: IDatabase;

  private apis: IServerAppApi[];

  private app: Express;

  public constructor({ config, logger, database, apis }: Constructor) {
    this.config = config;
    this.logger = logger;
    this.database = database;
    this.apis = apis;
    this.app = express();
    this.app.use(bodyParser.json());
  }

  private initServe(): void {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../public',
    );
    this.app.use(express.static(staticPath));
    this.app.use((_request: Request, response: Response) => {
      response.sendFile('index.html', { root: staticPath });
    });
  }

  private validator = createValidator({ passError: true });

  public addRoute(parameters: ExpressRouteParameters): void {
    const { method, path, handler, validation } = parameters;

    const middleware: Array<RequestHandler> = [];

    if (validation) {
      if (validation.body) {
        middleware.push(this.validator.body(validation.body));
      }

      if (validation.params) {
        middleware.push(this.validator.params(validation.params));
      }

      if (validation.query) {
        middleware.push(this.validator.query(validation.query));
      }
    }

    this.app[method](
      path,
      middleware,
      (request: Request, response: Response, next: NextFunction): void => {
        const result = handler(request, response, next);

        if (result instanceof Promise) {
          result.catch(next);
        }
      },
    );

    this.logger.info(
      `Route: ${(method as string).toUpperCase()} ${path} is registered`,
    );
  }

  public addJoiErrorHandler(): void {
    this.app.use(
      (
        error: unknown,
        _request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (this.isValidationError(error)) {
          const validationError = error;

          this.logger.error(`[Validation Error]: ${validationError.message}`);
          response.status(HttpCode.UNPROCESSED_ENTITY).json({
            errorType: 'VALIDATION',
            message: 'Validation failed',
            details: validationError.details.map((error) => ({
              path: error.path,
              message: error.message,
            })),
          });
        } else {
          next(error);
        }
      },
    );
  }

  private isValidationError(error: unknown): error is ValidationError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'details' in error
    );
  }

  public addRoutes(parameters: ExpressRouteParameters[]): void {
    for (const route of parameters) {
      this.addRoute(route);
    }

    this.addJoiErrorHandler();
  }

  private async initMiddlewares(): Promise<void> {
    await Promise.all(
      this.apis.map((it) => {
        this.logger.info(
          `Generate swagger documentation for API ${it.version}`,
        );
        this.app.use(
          '/api/docs',
          swaggerUi.serve,
          swaggerUi.setup(it.generateDoc()),
        );
      }),
    );
    this.app.use(cors());
  }

  private initPlugins(): void {
    this.app.use(bodyParser.raw({ type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public initRoutes(): void {
    const routers = this.apis.flatMap((it) => it.routes);

    this.addRoutes(routers);
  }

  public async init(): Promise<Express> {
    this.logger.info('Application initialization…');
    this.database.connect();
    await this.initMiddlewares();
    this.initPlugins();
    this.initRoutes();

    this.app.listen(this.config.ENV.APP.PORT, () => {
      this.logger.info(
        `Application is listening on PORT: ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT : ${
          this.config.ENV.APP.ENVIRONMENT as string
        }.`,
      );
    });

    return this.app;
  }

  public getInstance(): Express{
    return this.app;
  }
}

export { ServerApp };
