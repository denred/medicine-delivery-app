import { type ExpressRouteParameters } from '~/libs/packages/server/libs/types/types.js';

import { type ControllerRouteParameters } from '../types/types.js';

interface IController {
  routes: ExpressRouteParameters[];
  addRoute(options: ControllerRouteParameters): void;
}

export { type IController };
