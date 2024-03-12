import { serverInitializer } from '../build/backend/index.js';

export default async (req, res) => {
  const app = await serverInitializer();
  app(req, res);
};
