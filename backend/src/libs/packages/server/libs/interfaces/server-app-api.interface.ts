import { type ExpressRouteParameters } from '../types/types.js';

interface IServerAppApi {
  version: string;
  routes: ExpressRouteParameters[];
  buildFullPath(path: string): string;
  generateDoc(): object;
}

export { type IServerAppApi };
