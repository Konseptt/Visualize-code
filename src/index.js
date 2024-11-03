import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Render the root component of the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <ToastContainer />
    </NextUIProvider>
  </React.StrictMode>
);

// Measure performance in the app
reportWebVitals();
