import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import './bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
