import { type ExpressRouteParameters } from '../types/types.js';

interface IServerApp {
  addRoute(parameters: ExpressRouteParameters): void;
  addRoutes(parameters: ExpressRouteParameters[]): void;
}

export { type IServerApp };
