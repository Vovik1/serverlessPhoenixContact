import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { configure } from 'mobx';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

configure({
  enforceActions: 'always',
});

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
