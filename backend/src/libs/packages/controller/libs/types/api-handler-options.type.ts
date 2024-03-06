import { type DefaultApiHandlerOptions } from './default-api-handler-options.type.js';

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  hostname: T['hostname'];
};

export { type ApiHandlerOptions };
