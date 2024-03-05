import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';

dotenv.config();

const app = express();

const HEADER_TEXT = 'text/plain';
const port = process.env.PORT || 3000;

app.get('/', (_request: Request, response: Response) => {
  response.send('Shop');
});

app.get('/cart', (_request: Request, response: Response) => {
  response.type(HEADER_TEXT);
  response.send('Shopping cart');
});

app.use((_request: Request, response: Response) => {
  response.type(HEADER_TEXT);
  response.status(404).send('404 — Not found');
});

app.use((_error: Error, _request: Request, response: Response): void => {
  response.type('text/plain');
  response.status(500).send('500 — Server error');
});

app.listen(port, () => {});
