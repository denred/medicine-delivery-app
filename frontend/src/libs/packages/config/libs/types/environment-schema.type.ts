import { type AppEnvironment } from '../enums/enums.js';
import { type ValueOf } from '~/libs/types/index.js';

type EnvironmentSchema = {
  APP: {
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  API: {
    ORIGIN_URL: string;
    SERVER_URL: string;
  };
};

export { type EnvironmentSchema };
