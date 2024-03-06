import { type HttpMethod } from '~/libs/packages/http/http';
import { type ValidationSchema } from '~/libs/types/types';

import { type ApiHandler } from './api-handler.type';

type ControllerRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: ApiHandler;
  validation?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
