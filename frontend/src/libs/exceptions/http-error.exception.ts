import { type ServerErrorType, type HttpCode } from '~/libs/enums/index.js';
import { type ServerErrorDetail, type ValueOf } from '~/libs/types/index.js';
import { HttpError as LibraryHttpError } from 'shared/build/index.js';

type Constructor = {
  status: ValueOf<typeof HttpCode>;
  details: ServerErrorDetail[];
  message: string;
  errorType: ValueOf<typeof ServerErrorType>;
  cause?: unknown;
};

class HttpError extends LibraryHttpError {
  public errorType: ValueOf<typeof ServerErrorType>;

  public details: ServerErrorDetail[];

  public constructor({
    message,
    status,
    cause,
    errorType,
    details,
  }: Constructor) {
    super({
      message,
      status,
      cause,
    });

    this.errorType = errorType;
    this.details = details;
  }
}

export { HttpError as HttpException };
