import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import GameWeek from './pages/GameWeek';
import SeasonPhase from './pages/SeasonPhase';
import HomePage from './pages/Home';
import CoachLanding from './pages/CoachLanding';
import CoachSetup from './pages/CoachSetup';
import DynastyHomePage from './pages/DynastyHomePage';
import CFBLandscapePage from './pages/CFBLandscapePage';
import YourCareerPage from './pages/YourCareerPage';
import PastStatsPage from './pages/PastStatsPage';
import AwardWinnersPage from './pages/AwardWinnersPage';
import DraftPicksPage from './pages/DraftPicksPage';
import TeamHubPage from './pages/TeamHubPage';
import RosterPage from './pages/RosterPage';
import DepthChartPage from './pages/DepthChartPage';
import RecruitingPage from './pages/RecruitingPage';
import Schedule from './components/Schedule';
import DynastyLayout from './components/layouts/DynastyLayout';

function App() {
    return (
        <Router>
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
                {/* Routes with DynastyLayout */}
                <Route
                    path="/:coachId"
                    element={
                        <DynastyLayout>
                            <DynastyHomePage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/cfb"
                    element={
                        <DynastyLayout>
                            <CFBLandscapePage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/career"
                    element={
                        <DynastyLayout>
                            <YourCareerPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/career/past-stats"
                    element={
                        <DynastyLayout>
                            <PastStatsPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/career/awards"
                    element={
                        <DynastyLayout>
                            <AwardWinnersPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/career/draft-picks"
                    element={
                        <DynastyLayout>
                            <DraftPicksPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/team"
                    element={
                        <DynastyLayout>
                            <TeamHubPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/team/roster"
                    element={
                        <DynastyLayout>
                            <RosterPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/team/depth-chart"
                    element={
                        <DynastyLayout>
                            <DepthChartPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/recruiting"
                    element={
                        <DynastyLayout>
                            <RecruitingPage />
                        </DynastyLayout>
                    }
                />
                <Route
                    path="/:coachId/schedule"
                    element={
                        <DynastyLayout>
                            <Schedule />
                        </DynastyLayout>
                    }
                />
                {/* Routes without layout */}
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
        </Router>
    );
}

export default App;
