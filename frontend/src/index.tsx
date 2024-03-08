import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import '~/assets/css/styles.scss';
import { Notification, Router } from '~/libs/components/components.js';
import { Provider } from 'react-redux';
import { store } from './libs/packages/redux/store.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
      <Notification />
    </Provider>
  </StrictMode>,
);
