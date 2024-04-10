import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/App';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { CreateTournament } from './pages/CreateTournament';
import { Profile } from './pages/Profile';
import { LeagueJoining } from './pages/LeagueJoining';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='login/' element={<Login />} />
                    <Route path='create-tournament/' element={<CreateTournament />} />
                    <Route path='profile/' element={<Profile />} />
                    <Route path='league-joining/' element={<LeagueJoining />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
