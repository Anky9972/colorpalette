import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Toaster} from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom';
import ColorStateContextProvider from './context/ColorState';
import AuthenticationContextProvider from './context/Authentication';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorStateContextProvider>
    <AuthenticationContextProvider>

    <BrowserRouter>
    
    <Toaster/>
    <App />
    </BrowserRouter>
    </AuthenticationContextProvider>
    </ColorStateContextProvider>
  </React.StrictMode>
);

reportWebVitals();
