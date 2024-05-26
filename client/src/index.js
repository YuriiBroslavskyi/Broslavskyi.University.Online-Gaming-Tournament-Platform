import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router';
import './css/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ToastContainer />
        <Router />
    </React.StrictMode>
);
