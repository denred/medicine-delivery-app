import { database } from './database.js';

const migrate = async (): Promise<void> => {
  return database.migrate();
};

await migrate();
