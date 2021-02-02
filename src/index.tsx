import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { configure } from 'mobx';

configure({
  enforceActions: 'always',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
