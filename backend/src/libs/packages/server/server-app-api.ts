import swaggerJsdoc from 'swagger-jsdoc';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';

import { type IServerAppApi } from './libs/interfaces/interfaces.js';
import { type ExpressRouteParameters } from './libs/types/types.js';

class ServerAppApi implements IServerAppApi {
  public version: string;

  public routes: ExpressRouteParameters[];

  private config: IConfig;

  public constructor(
    version: string,
    config: IConfig,
    ...handlers: ExpressRouteParameters[]
  ) {
    this.version = version;
    this.config = config;
    this.routes = handlers.map((it) => ({
      ...it,
      path: this.buildFullPath(it.path),
    }));
  }

  public buildFullPath(path: string): string {
    return `/api/${this.version}${path}`;
  }

  public generateDoc(): ReturnType<typeof swaggerJsdoc> {
    const isProduction =
      this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;

    const isDevelopment =
      this.config.ENV.APP.ENVIRONMENT === AppEnvironment.DEVELOPMENT;

    const controllerExtension = isProduction || isDevelopment ? 'js' : 'ts';
    const sourceDirectory = isDevelopment ? '.' : 'src';

    return swaggerJsdoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Medicine Delivery API',
          version: `${this.version}.0.0`,
        },
        servers: [
          {
            url: `/api/${this.version}`,
          },
        ],
      },
      apis: [
        `${sourceDirectory}/packages/**/*.controller.${controllerExtension}`,
      ],
    });
  }
}

export { ServerAppApi };
