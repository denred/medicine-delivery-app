import { type Express } from 'express';

import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { productController } from '~/packages/products/products.js';

import { ServerApp } from './server-app.package.js';
import { ServerAppApi } from './server-app-api.js';

let server: ServerApp;

async function initServer(): Promise<Express> {
  if (!server) {
    const apiV1 = new ServerAppApi('v1', config, ...productController.routes);

    server = new ServerApp({
      config,
      logger,
      database,
      apis: [apiV1],
    });

    await server.init();
  }

  return server.getInstance();
}

export { initServer as serverInitializer };
export { type ExpressRouteParameters } from './libs/types/types.js';
