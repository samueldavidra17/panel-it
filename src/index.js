import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';;
//inicio de la aplicacion
//https://es.reactjs.org/docs/getting-started.html --> doc de react (get started)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);