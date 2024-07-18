import ReactDOM from 'react-dom/client';
import {setupStore} from './store/store';
import {Provider} from 'react-redux';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const store = setupStore();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
