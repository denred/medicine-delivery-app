import { type ErrorConstructor } from '~/libs/types/index.js';

class ApplicationError extends Error {
  public constructor({ message, cause }: ErrorConstructor) {
    super(message, {
      cause,
    });
  }
}

export { ApplicationError };
