import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/App';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='login/' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
