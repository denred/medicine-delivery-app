import { type ApiHandlerOptions } from '../types/types.js';

const getURL = (
  protocol: string,
  hostname: ApiHandlerOptions['hostname'],
): string => `${protocol}://${hostname}`;

export { getURL };
