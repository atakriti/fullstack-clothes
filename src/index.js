import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import ContextFun from './ContextFun';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextFun>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextFun>
);
serviceWorkerRegistration.register();

reportWebVitals();
