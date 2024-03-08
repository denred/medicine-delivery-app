import { HttpError } from '../exceptions/exceptions.js';

type ServerErrorHandling = {
  error: HttpError | null;
  clearError: () => void;
};

export { type ServerErrorHandling };
