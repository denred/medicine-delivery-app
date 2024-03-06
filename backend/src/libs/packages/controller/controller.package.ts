import { type ILogger } from '../logger/logger.js';
import { type ExpressRouteParameters } from '../server/server.js';
import { getURL } from './libs/helpers/helpers.js';
import { type IController } from './libs/interfaces/interfaces.js';
import { type ControllerRouteParameters } from './libs/types/controller-route-parameters.type.js';
import { type ApiHandler, type ApiHandlerOptions } from './libs/types/types.js';

class Controller implements IController {
  private logger: ILogger;

  private apiUrl: string;

  public routes: ExpressRouteParameters[];

  public constructor(logger: ILogger, apiUrl: string) {
    this.logger = logger;
    this.apiUrl = apiUrl;
    this.routes = [];
  }

  public addRoute(options: ControllerRouteParameters): void {
    const { handler, path } = options;
    const fullPath = this.apiUrl + path;

    this.routes.push({
      ...options,
      path: fullPath,
      handler: (request, reply) => this.mapHandler(handler, request, reply),
    });
  }

  private async mapHandler(
    handler: ApiHandler,
    request: Parameters<ExpressRouteParameters['handler']>[0],
    reply: Parameters<ExpressRouteParameters['handler']>[1],
  ): Promise<void> {
    this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

    const handlerOptions = this.mapRequest(request);
    const { status, payload } = await handler(handlerOptions);

    reply.status(status).send(payload);
  }

  private mapRequest(
    request: Parameters<ExpressRouteParameters['handler']>[0],
  ): ApiHandlerOptions {
    const { body, query, params, hostname, protocol } =
      request as ApiHandlerOptions & {
        protocol: string;
      };

    return {
      body,
      query,
      params,
      hostname: getURL(protocol, hostname),
    };
  }
}

export { Controller };
