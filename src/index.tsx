import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';

import App from './app';


import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <App />
  </Router>
);
