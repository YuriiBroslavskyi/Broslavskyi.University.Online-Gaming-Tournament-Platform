import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/App';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { CreateTournament } from './pages/CreateTournament';
import { Profile } from './pages/Profile';
import { LeagueJoining } from './pages/LeagueJoining';
import { LatestEvents } from './pages/LatestEvents';
import { CreateFeedback } from './pages/Feedback';
import AboutPage from './pages/About';
import EndTournament from './pages/endTournament';
import LiveChat from './pages/LiveChat'; // ✅ Import ChatPage

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
                    <Route path='latest-events/' element={<LatestEvents />} />
                    <Route path='feedback/' element={<CreateFeedback />} />
                    <Route path='about/' element={<AboutPage />} />
                    <Route path='tournaments/:tournamentId/end' element={<EndTournament />} />
                    <Route path='tournaments/:tournamentId/chat' element={<LiveChat />} /> {/* ✅ New Chat Route */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
