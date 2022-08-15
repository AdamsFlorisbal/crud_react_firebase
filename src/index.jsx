import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {Aviso} from './components/firebase/header/Aviso';

ReactDOM.render(

  <React.StrictMode>

    <Aviso />
    <App />
    
  </React.StrictMode>,
  document.getElementById("root")
);

  



