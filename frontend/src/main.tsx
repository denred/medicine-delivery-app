import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { Notification } from './libs/components/components.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Notification />
  </StrictMode>,
);
