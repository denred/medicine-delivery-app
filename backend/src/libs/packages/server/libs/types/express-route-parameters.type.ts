import { type NextFunction, type Request, type Response } from 'express';

import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema } from '~/libs/types/types.js';

type ExpressRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void> | void;
  validation?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ExpressRouteParameters };
