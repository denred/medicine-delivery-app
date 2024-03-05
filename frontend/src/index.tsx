import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Notification } from '~/libs/components/components.js';
import { Shop } from './pages/pages.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shop />
    <Notification />
  </StrictMode>,
);
