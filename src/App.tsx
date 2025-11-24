import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import GameWeek from './pages/GameWeek';
import SeasonPhase from './pages/SeasonPhase';
import HomePage from './pages/Home';
import CoachLanding from './pages/CoachLanding';
import CoachSetup from './pages/CoachSetup';
import Schedule from './components/Schedule';

function App() {
    return (
        <Router>
            <Box
                mx={'auto'}
                maxWidth={'xl'}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/coach"
                        element={<CoachLanding />}
                    />
                    <Route
                        path="/:coachId/setup"
                        element={<CoachSetup />}
                    />
                    <Route
                        path="/week/:weekId"
                        element={<GameWeek />}
                    />
                    <Route
                        path="/phase/:phaseId"
                        element={<SeasonPhase />}
                    />
                    <Route
                        path="/schedule"
                        element={<Schedule />}
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />
                </Routes>
            </Box>
        </Router>
    );
}

export default App;
