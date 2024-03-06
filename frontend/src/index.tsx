import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import '~/assets/css/styles.scss';
import { Notification, Router } from '~/libs/components/components.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <Notification />
  </StrictMode>,
);
