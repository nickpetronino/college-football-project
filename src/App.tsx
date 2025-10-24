import './App.css';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    Box,
    AppBar,
    Container,
    Toolbar,
} from '@mui/material';

import { Home, Group, Settings, Info } from '@mui/icons-material';
import SeasonTimeline from './components/SeasonTimeline';

function App() {
    return (
        <Box
            mx={'auto'}
            maxWidth={'xl'}
        >
            <SeasonTimeline />
        </Box>
    );
}

export default App;
