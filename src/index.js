import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import philter from './store'

let store = createStore(philter)

ReactDOM.render(
  <Provider store={store}>
    <App dispatch={store.dispatch}/>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
