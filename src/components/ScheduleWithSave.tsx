import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    FormControlLabel,
    TextField,
    Autocomplete,
    Box,
    Typography,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Save, Cancel, CloudUpload, CloudDownload } from '@mui/icons-material';
import {
    saveSchedule,
    loadSchedule,
    updateSchedule,
    ScheduleData,
    ScheduleGame,
} from '../utils/scheduleApi';

// FBS Schools data with logos (same as original)
const FBSSchools = [
    {
        name: 'Alabama',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/333.png',
    },
    {
        name: 'Auburn',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2.png',
    },
    {
        name: 'Florida',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/57.png',
    },
    {
        name: 'Georgia',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/61.png',
    },
    { name: 'LSU', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/99.png' },
    {
        name: 'Tennessee',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2633.png',
    },
    {
        name: 'Texas A&M',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/245.png',
    },
    {
        name: 'Kentucky',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/96.png',
    },
    {
        name: 'South Carolina',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2579.png',
    },
    {
        name: 'Missouri',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/142.png',
    },
    {
        name: 'Vanderbilt',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/238.png',
    },
    {
        name: 'Ole Miss',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/145.png',
    },
    {
        name: 'Mississippi State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/344.png',
    },
    {
        name: 'Arkansas',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/8.png',
    },
    {
        name: 'Ohio State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/194.png',
    },
    {
        name: 'Michigan',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/130.png',
    },
    {
        name: 'Penn State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/213.png',
    },
    {
        name: 'Wisconsin',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/275.png',
    },
    {
        name: 'Iowa',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2294.png',
    },
    {
        name: 'Nebraska',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/158.png',
    },
    {
        name: 'Minnesota',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/135.png',
    },
    {
        name: 'Northwestern',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/77.png',
    },
    {
        name: 'Illinois',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/356.png',
    },
    {
        name: 'Purdue',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png',
    },
    {
        name: 'Indiana',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/84.png',
    },
    {
        name: 'Maryland',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/120.png',
    },
    {
        name: 'Rutgers',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/164.png',
    },
    {
        name: 'Michigan State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/127.png',
    },
    {
        name: 'Oregon',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png',
    },
    {
        name: 'Washington',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/264.png',
    },
    { name: 'USC', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/30.png' },
    { name: 'UCLA', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/26.png' },
    {
        name: 'Utah',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/254.png',
    },
    {
        name: 'Colorado',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/38.png',
    },
    {
        name: 'Arizona',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/12.png',
    },
    {
        name: 'Arizona State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/9.png',
    },
    {
        name: 'Stanford',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/24.png',
    },
    {
        name: 'California',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/25.png',
    },
    {
        name: 'Oregon State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/204.png',
    },
    {
        name: 'Washington State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/265.png',
    },
    {
        name: 'Oklahoma',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/201.png',
    },
    {
        name: 'Texas',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/251.png',
    },
    {
        name: 'Baylor',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/239.png',
    },
    { name: 'TCU', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/262.png' },
    {
        name: 'Oklahoma State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/197.png',
    },
    {
        name: 'Texas Tech',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2641.png',
    },
    {
        name: 'Kansas State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2306.png',
    },
    {
        name: 'Iowa State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/66.png',
    },
    {
        name: 'Kansas',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png',
    },
    {
        name: 'West Virginia',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/277.png',
    },
    {
        name: 'Cincinnati',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png',
    },
    {
        name: 'UCF',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2116.png',
    },
    {
        name: 'Houston',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/248.png',
    },
    { name: 'BYU', logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/252.png' },
    {
        name: 'Clemson',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/228.png',
    },
    {
        name: 'Florida State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/52.png',
    },
    {
        name: 'Miami',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2390.png',
    },
    {
        name: 'North Carolina',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/153.png',
    },
    {
        name: 'NC State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/152.png',
    },
    {
        name: 'Virginia Tech',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/259.png',
    },
    {
        name: 'Virginia',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/258.png',
    },
    {
        name: 'Pitt',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/221.png',
    },
    {
        name: 'Louisville',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/97.png',
    },
    {
        name: 'Boston College',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/103.png',
    },
    {
        name: 'Syracuse',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/183.png',
    },
    {
        name: 'Wake Forest',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/154.png',
    },
    {
        name: 'Duke',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/150.png',
    },
    {
        name: 'Georgia Tech',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/59.png',
    },
    {
        name: 'Notre Dame',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/87.png',
    },
    {
        name: 'Navy',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2426.png',
    },
    {
        name: 'Army',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/349.png',
    },
    {
        name: 'Air Force',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png',
    },
    {
        name: 'Liberty',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2335.png',
    },
    {
        name: 'Appalachian State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2026.png',
    },
    {
        name: 'Coastal Carolina',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/324.png',
    },
    {
        name: 'Georgia Southern',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/290.png',
    },
    {
        name: 'Georgia State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2247.png',
    },
    {
        name: 'James Madison',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/256.png',
    },
    {
        name: 'Marshall',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/276.png',
    },
    {
        name: 'Old Dominion',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/295.png',
    },
    {
        name: 'South Alabama',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/6.png',
    },
    {
        name: 'Southern Miss',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2572.png',
    },
    {
        name: 'Texas State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/326.png',
    },
    {
        name: 'Troy',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2653.png',
    },
    {
        name: 'UL Monroe',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2433.png',
    },
    {
        name: 'Louisiana',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/309.png',
    },
    {
        name: 'Arkansas State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2032.png',
    },
    {
        name: 'South Alabama',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/6.png',
    },
    {
        name: 'Tulane',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2655.png',
    },
    {
        name: 'SMU',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2567.png',
    },
    {
        name: 'Memphis',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/235.png',
    },
    {
        name: 'Tulsa',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/202.png',
    },
    {
        name: 'Temple',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/218.png',
    },
    {
        name: 'East Carolina',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/151.png',
    },
    {
        name: 'Charlotte',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2429.png',
    },
    {
        name: 'FAU',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png',
    },
    {
        name: 'FIU',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2229.png',
    },
    {
        name: 'North Texas',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/249.png',
    },
    {
        name: 'UTSA',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2636.png',
    },
    {
        name: 'Rice',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/242.png',
    },
    {
        name: 'UTEP',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2638.png',
    },
    {
        name: 'Louisiana Tech',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2348.png',
    },
    {
        name: 'Middle Tennessee',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2393.png',
    },
    {
        name: 'Western Kentucky',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/98.png',
    },
    {
        name: 'New Mexico State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/166.png',
    },
    {
        name: 'Sam Houston',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/328.png',
    },
    {
        name: 'Jacksonville State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/3.png',
    },
    {
        name: 'Kennesaw State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png',
    },
    {
        name: 'Delaware',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/300.png',
    },
    {
        name: 'UMass',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/113.png',
    },
    {
        name: 'Connecticut',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/41.png',
    },
    {
        name: 'Buffalo',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2084.png',
    },
    {
        name: 'Akron',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png',
    },
    {
        name: 'Ball State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2050.png',
    },
    {
        name: 'Bowling Green',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/189.png',
    },
    {
        name: 'Central Michigan',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2117.png',
    },
    {
        name: 'Eastern Michigan',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png',
    },
    {
        name: 'Kent State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2309.png',
    },
    {
        name: 'Miami (OH)',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/193.png',
    },
    {
        name: 'Northern Illinois',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2459.png',
    },
    {
        name: 'Ohio',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/195.png',
    },
    {
        name: 'Toledo',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2649.png',
    },
    {
        name: 'Western Michigan',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2711.png',
    },
    {
        name: 'Boise State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/68.png',
    },
    {
        name: 'Fresno State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/278.png',
    },
    {
        name: 'Hawaii',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/62.png',
    },
    {
        name: 'Nevada',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2440.png',
    },
    {
        name: 'New Mexico',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/167.png',
    },
    {
        name: 'San Diego State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/21.png',
    },
    {
        name: 'San Jose State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/23.png',
    },
    {
        name: 'UNLV',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2439.png',
    },
    {
        name: 'Utah State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/328.png',
    },
    {
        name: 'Wyoming',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2751.png',
    },
    {
        name: 'Colorado State',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/36.png',
    },
    {
        name: 'Florida Atlantic',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png',
    },
    {
        name: 'Florida International',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2229.png',
    },
];

const ScheduleWithSave: React.FC = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [schedule, setSchedule] = useState<ScheduleGame[]>([]);
    const [editingSchedule, setEditingSchedule] = useState<ScheduleGame[]>([]);
    const [playthroughId, setPlaythroughId] = useState('playthrough-1');
    const [year, setYear] = useState(2024);
    const [teamName, setTeamName] = useState('My Team');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });
    const [saveDialog, setSaveDialog] = useState(false);
    const [opponentDialog, setOpponentDialog] = useState({
        open: false,
        week: 0,
        opponent: null as {
            name: string;
            logo: string;
            rank?: number;
            record?: { wins: number; losses: number };
            isRivalry?: boolean;
        } | null,
    });
    const [gameDialog, setGameDialog] = useState({
        open: false,
        week: 0,
        game: null as {
            isConferenceGame?: boolean;
            score?: { home: number; away: number };
            wentToOvertime?: boolean;
        } | null,
    });

    // Initialize schedule with weeks 0-15
    useEffect(() => {
        const initialSchedule: ScheduleGame[] = Array.from(
            { length: 16 },
            (_, index) => ({
                week: index,
                location: 'Home' as const,
                opponent: null,
                isByeWeek: false,
            })
        );
        setSchedule(initialSchedule);
        setEditingSchedule(initialSchedule);
    }, []);

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            setSchedule([...editingSchedule]);
        } else {
            // Start editing - copy current schedule
            setEditingSchedule([...schedule]);
        }
        setIsEditing(!isEditing);
    };

    const handleLocationChange = (week: number, location: 'Home' | 'Away') => {
        setEditingSchedule((prev) =>
            prev.map((game) =>
                game.week === week ? { ...game, location } : game
            )
        );
    };

    const handleOpponentChange = (
        week: number,
        opponent: {
            name: string;
            logo: string;
            rank?: number;
            record?: { wins: number; losses: number };
            isRivalry?: boolean;
        } | null
    ) => {
        setEditingSchedule((prev) =>
            prev.map((game) =>
                game.week === week ? { ...game, opponent } : game
            )
        );
    };

    const handleOpenOpponentDialog = (week: number, opponent: any) => {
        setOpponentDialog({
            open: true,
            week,
            opponent: opponent || {
                name: '',
                logo: '',
                rank: undefined,
                record: { wins: 0, losses: 0 },
                isRivalry: false,
            },
        });
    };

    const handleCloseOpponentDialog = () => {
        setOpponentDialog({ open: false, week: 0, opponent: null });
    };

    const handleSaveOpponent = () => {
        handleOpponentChange(opponentDialog.week, opponentDialog.opponent);
        handleCloseOpponentDialog();
    };

    const handleOpenGameDialog = (week: number, game: any) => {
        setGameDialog({
            open: true,
            week,
            game: game || {
                isConferenceGame: false,
                score: { home: 0, away: 0 },
                wentToOvertime: false,
            },
        });
    };

    const handleCloseGameDialog = () => {
        setGameDialog({ open: false, week: 0, game: null });
    };

    const handleSaveGame = () => {
        setEditingSchedule((prev) =>
            prev.map((game) =>
                game.week === gameDialog.week
                    ? {
                          ...game,
                          isConferenceGame: gameDialog.game?.isConferenceGame,
                          score: gameDialog.game?.score,
                          wentToOvertime: gameDialog.game?.wentToOvertime,
                      }
                    : game
            )
        );
        handleCloseGameDialog();
    };

    const handleByeWeekToggle = (week: number) => {
        setEditingSchedule((prev) =>
            prev.map((game) =>
                game.week === week
                    ? {
                          ...game,
                          isByeWeek: !game.isByeWeek,
                          opponent: !game.isByeWeek ? null : game.opponent,
                          location: !game.isByeWeek
                              ? ('Home' as const)
                              : game.location,
                      }
                    : game
            )
        );
    };

    const handleCancel = () => {
        setEditingSchedule([...schedule]);
        setIsEditing(false);
    };

    const handleSaveToDatabase = async () => {
        try {
            const scheduleData: ScheduleData = {
                playthroughId,
                year,
                teamName,
                games: editingSchedule,
            };

            // Check if schedule already exists
            const existingSchedule = await loadSchedule(playthroughId, year);

            if (existingSchedule) {
                // Update existing schedule
                await updateSchedule(playthroughId, year, scheduleData);
                showSnackbar('Schedule updated successfully!', 'success');
            } else {
                // Create new schedule
                await saveSchedule(scheduleData);
                showSnackbar('Schedule saved successfully!', 'success');
            }

            setSchedule([...editingSchedule]);
            setSaveDialog(false);
        } catch (error) {
            showSnackbar(`Failed to save schedule: ${error}`, 'error');
        }
    };

    const handleLoadFromDatabase = async () => {
        try {
            const savedSchedule = await loadSchedule(playthroughId, year);
            if (savedSchedule) {
                setSchedule(savedSchedule.games);
                setEditingSchedule(savedSchedule.games);
                setTeamName(savedSchedule.teamName);
                showSnackbar('Schedule loaded successfully!', 'success');
            } else {
                showSnackbar(
                    'No saved schedule found for this playthrough and year',
                    'error'
                );
            }
        } catch (error) {
            showSnackbar(`Failed to load schedule: ${error}`, 'error');
        }
    };

    const handleLoadSampleData = () => {
        const sampleSchedule: ScheduleGame[] = [
            {
                week: 0,
                location: 'Home',
                opponent: {
                    name: 'Miami',
                    logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2390.png',
                    rank: 8,
                    record: { wins: 7, losses: 2 },
                    isRivalry: false,
                },
                isByeWeek: false,
                isConferenceGame: false,
                score: { home: 31, away: 14 },
                wentToOvertime: false,
            },
            {
                week: 1,
                location: 'Away',
                opponent: {
                    name: 'Auburn',
                    logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2.png',
                    rank: 15,
                    record: { wins: 5, losses: 4 },
                    isRivalry: true,
                },
                isByeWeek: false,
                isConferenceGame: true,
                score: { home: 21, away: 28 },
                wentToOvertime: false,
            },
            {
                week: 2,
                location: 'Home',
                opponent: null,
                isByeWeek: true,
                isConferenceGame: false,
                score: undefined,
                wentToOvertime: false,
            },
            {
                week: 3,
                location: 'Home',
                opponent: {
                    name: 'Georgia',
                    logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/61.png',
                    rank: 3,
                    record: { wins: 9, losses: 0 },
                    isRivalry: true,
                },
                isByeWeek: false,
                isConferenceGame: true,
                score: { home: 24, away: 27 },
                wentToOvertime: true,
            },
            {
                week: 4,
                location: 'Away',
                opponent: {
                    name: 'LSU',
                    logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/99.png',
                    rank: 12,
                    record: { wins: 6, losses: 3 },
                    isRivalry: false,
                },
                isByeWeek: false,
                isConferenceGame: true,
                score: { home: 17, away: 35 },
                wentToOvertime: false,
            },
        ];

        // Fill remaining weeks with empty games
        const fullSchedule = [...sampleSchedule];
        for (let i = 5; i < 16; i++) {
            fullSchedule.push({
                week: i,
                location: 'Home' as const,
                opponent: null,
                isByeWeek: false,
                isConferenceGame: false,
                score: undefined,
                wentToOvertime: false,
            });
        }

        setEditingSchedule(fullSchedule);
        showSnackbar('Sample data loaded successfully!', 'success');
    };

    const handleFinalizeSchedule = async () => {
        try {
            // First save any pending changes
            setSchedule([...editingSchedule]);

            const scheduleData: ScheduleData = {
                playthroughId,
                year,
                teamName,
                games: editingSchedule,
            };

            // Check if schedule already exists
            const existingSchedule = await loadSchedule(playthroughId, year);

            if (existingSchedule) {
                // Update existing schedule
                await updateSchedule(playthroughId, year, scheduleData);
                showSnackbar(
                    'Schedule finalized and updated successfully!',
                    'success'
                );
            } else {
                // Create new schedule
                await saveSchedule(scheduleData);
                showSnackbar(
                    'Schedule finalized and saved successfully!',
                    'success'
                );
            }

            // Exit edit mode after finalizing
            setIsEditing(false);
        } catch (error) {
            showSnackbar(`Failed to finalize schedule: ${error}`, 'error');
        }
    };

    return (
        <Box sx={{ width: '100%', p: 3, height: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    Season Schedule
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {isEditing && (
                        <>
                            <Tooltip title="Save Changes">
                                <IconButton
                                    color="primary"
                                    onClick={handleEditToggle}
                                    size="small"
                                >
                                    <Save />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton
                                    color="error"
                                    onClick={handleCancel}
                                    size="small"
                                >
                                    <Cancel />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="Save to Database">
                        <Button
                            variant="outlined"
                            startIcon={<CloudUpload />}
                            onClick={() => setSaveDialog(true)}
                            size="small"
                        >
                            Save
                        </Button>
                    </Tooltip>
                    <Tooltip title="Load from Database">
                        <Button
                            variant="outlined"
                            startIcon={<CloudDownload />}
                            onClick={handleLoadFromDatabase}
                            size="small"
                        >
                            Load
                        </Button>
                    </Tooltip>
                    <Tooltip title="Load Sample Data">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleLoadSampleData}
                            size="small"
                            disabled={!isEditing}
                        >
                            Sample Data
                        </Button>
                    </Tooltip>
                    <Tooltip title="Finalize and Save to Database">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleFinalizeSchedule}
                            size="small"
                            disabled={!isEditing}
                        >
                            Finalize
                        </Button>
                    </Tooltip>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isEditing}
                                onChange={handleEditToggle}
                                color="primary"
                            />
                        }
                        label={isEditing ? 'Exit Edit Mode' : 'Edit Schedule'}
                    />
                </Box>
            </Box>

            {/* Save Dialog */}
            <Dialog
                open={saveDialog}
                onClose={() => setSaveDialog(false)}
            >
                <DialogTitle>Save Schedule</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 1,
                        }}
                    >
                        <TextField
                            label="Playthrough ID"
                            value={playthroughId}
                            onChange={(e) => setPlaythroughId(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Year"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            fullWidth
                        />
                        <TextField
                            label="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleSaveToDatabase}
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Rest of the component remains the same as the original Schedule component */}
            <TableContainer
                component={Paper}
                sx={{ maxHeight: '90vh' }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                }}
                            >
                                Week
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                }}
                            >
                                Location
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                }}
                            >
                                Opponent
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(isEditing ? editingSchedule : schedule).map(
                            (game) => {
                                if (game.isByeWeek) {
                                    return (
                                        <TableRow
                                            key={game.week}
                                            sx={{
                                                height: 75,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                backgroundColor: isEditing
                                                    ? 'grey.200'
                                                    : 'grey.100',
                                                color: isEditing
                                                    ? 'grey.800'
                                                    : 'grey.600',
                                                py: 3,
                                                cursor: isEditing
                                                    ? 'pointer'
                                                    : 'default',
                                                '&:hover': isEditing
                                                    ? {
                                                          backgroundColor:
                                                              'grey.300',
                                                          transition:
                                                              'background-color 0.2s',
                                                      }
                                                    : {},
                                            }}
                                            onClick={
                                                isEditing
                                                    ? () =>
                                                          handleByeWeekToggle(
                                                              game.week
                                                          )
                                                    : undefined
                                            }
                                        >
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    Week {game.week}
                                                </Typography>
                                            </TableCell>
                                            <TableCell colSpan={2}>
                                                {isEditing ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            BYE WEEK
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                opacity: 0.7,
                                                            }}
                                                        >
                                                            (Click to undo)
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    'BYE WEEK'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }

                                return (
                                    <TableRow
                                        key={game.week}
                                        sx={{ height: 75 }}
                                        hover
                                    >
                                        <TableCell
                                            sx={{
                                                fontWeight: 'bold',
                                                minWidth: 80,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    Week {game.week}
                                                </Typography>
                                                {isEditing && (
                                                    <Chip
                                                        label="Bye Week"
                                                        size="small"
                                                        color={
                                                            game.isByeWeek
                                                                ? 'primary'
                                                                : 'default'
                                                        }
                                                        variant={
                                                            game.isByeWeek
                                                                ? 'filled'
                                                                : 'outlined'
                                                        }
                                                        onClick={() =>
                                                            handleByeWeekToggle(
                                                                game.week
                                                            )
                                                        }
                                                        clickable
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                            height: 20,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: 120 }}>
                                            {isEditing ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Chip
                                                        label="Home"
                                                        color={
                                                            game.location ===
                                                            'Home'
                                                                ? 'primary'
                                                                : 'default'
                                                        }
                                                        variant={
                                                            game.location ===
                                                            'Home'
                                                                ? 'filled'
                                                                : 'outlined'
                                                        }
                                                        onClick={() =>
                                                            handleLocationChange(
                                                                game.week,
                                                                'Home'
                                                            )
                                                        }
                                                        clickable
                                                    />
                                                    <Chip
                                                        label="Away"
                                                        color={
                                                            game.location ===
                                                            'Away'
                                                                ? 'primary'
                                                                : 'default'
                                                        }
                                                        variant={
                                                            game.location ===
                                                            'Away'
                                                                ? 'filled'
                                                                : 'outlined'
                                                        }
                                                        onClick={() =>
                                                            handleLocationChange(
                                                                game.week,
                                                                'Away'
                                                            )
                                                        }
                                                        clickable
                                                    />
                                                </Box>
                                            ) : (
                                                <Chip
                                                    label={game.location}
                                                    color={
                                                        game.location === 'Home'
                                                            ? 'success'
                                                            : 'info'
                                                    }
                                                    variant="filled"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ minWidth: 200 }}>
                                            {isEditing ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Autocomplete
                                                        value={game.opponent}
                                                        onChange={(
                                                            _,
                                                            newValue
                                                        ) =>
                                                            handleOpponentChange(
                                                                game.week,
                                                                newValue
                                                            )
                                                        }
                                                        options={FBSSchools}
                                                        getOptionLabel={(
                                                            option
                                                        ) => option?.name || ''}
                                                        isOptionEqualToValue={(
                                                            option,
                                                            value
                                                        ) =>
                                                            option?.name ===
                                                            value?.name
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                placeholder="Search for opponent..."
                                                                variant="outlined"
                                                                size="small"
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    startAdornment:
                                                                        game.opponent ? (
                                                                            <Avatar
                                                                                src={
                                                                                    game
                                                                                        .opponent
                                                                                        .logo
                                                                                }
                                                                                alt={
                                                                                    game
                                                                                        .opponent
                                                                                        .name
                                                                                }
                                                                                sx={{
                                                                                    width: 24,
                                                                                    height: 24,
                                                                                    marginRight: 1,
                                                                                }}
                                                                                variant="rounded"
                                                                            />
                                                                        ) : null,
                                                                }}
                                                            />
                                                        )}
                                                        renderOption={(
                                                            props,
                                                            option
                                                        ) => (
                                                            <Box
                                                                component="li"
                                                                {...props}
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        option.logo
                                                                    }
                                                                    alt={
                                                                        option.name
                                                                    }
                                                                    sx={{
                                                                        width: 24,
                                                                        height: 24,
                                                                    }}
                                                                    variant="rounded"
                                                                />
                                                                {option.name}
                                                            </Box>
                                                        )}
                                                        sx={{
                                                            minWidth: 150,
                                                            flex: 1,
                                                        }}
                                                    />
                                                    {game.opponent && (
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() =>
                                                                handleOpenOpponentDialog(
                                                                    game.week,
                                                                    game.opponent
                                                                )
                                                            }
                                                        >
                                                            Edit Details
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() =>
                                                            handleOpenGameDialog(
                                                                game.week,
                                                                {
                                                                    isConferenceGame:
                                                                        game.isConferenceGame,
                                                                    score: game.score,
                                                                    wentToOvertime:
                                                                        game.wentToOvertime,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        Game Details
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {game.opponent ? (
                                                        <>
                                                            <Avatar
                                                                src={
                                                                    game
                                                                        .opponent
                                                                        .logo
                                                                }
                                                                alt={
                                                                    game
                                                                        .opponent
                                                                        .name
                                                                }
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                }}
                                                            />
                                                            <Box
                                                                sx={{ flex: 1 }}
                                                            >
                                                                <Typography variant="body1">
                                                                    {
                                                                        game
                                                                            .opponent
                                                                            .name
                                                                    }
                                                                </Typography>
                                                                {isEditing ? (
                                                                    <TextField
                                                                        label="Rank"
                                                                        type="number"
                                                                        size="small"
                                                                        value={
                                                                            game
                                                                                .opponent
                                                                                ?.rank ||
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newRank =
                                                                                parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                ) ||
                                                                                undefined;
                                                                            handleOpponentChange(
                                                                                game.week,
                                                                                {
                                                                                    ...game.opponent!,
                                                                                    rank: newRank,
                                                                                }
                                                                            );
                                                                        }}
                                                                        inputProps={{
                                                                            min: 1,
                                                                            max: 25,
                                                                        }}
                                                                        sx={{
                                                                            width: 80,
                                                                            mt: 1,
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    game
                                                                        .opponent
                                                                        ?.rank && (
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="primary"
                                                                        >
                                                                            #
                                                                            {
                                                                                game
                                                                                    .opponent
                                                                                    .rank
                                                                            }
                                                                        </Typography>
                                                                    )
                                                                )}
                                                                {isEditing ? (
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                            gap: 1,
                                                                            mt: 1,
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            label="Wins"
                                                                            type="number"
                                                                            size="small"
                                                                            value={
                                                                                game
                                                                                    .opponent
                                                                                    ?.record
                                                                                    ?.wins ||
                                                                                0
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const wins =
                                                                                    parseInt(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    ) ||
                                                                                    0;
                                                                                handleOpponentChange(
                                                                                    game.week,
                                                                                    {
                                                                                        ...game.opponent!,
                                                                                        record: {
                                                                                            ...game.opponent!
                                                                                                .record!,
                                                                                            wins: wins,
                                                                                        },
                                                                                    }
                                                                                );
                                                                            }}
                                                                            inputProps={{
                                                                                min: 0,
                                                                                max: 15,
                                                                            }}
                                                                            sx={{
                                                                                width: 60,
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            label="Losses"
                                                                            type="number"
                                                                            size="small"
                                                                            value={
                                                                                game
                                                                                    .opponent
                                                                                    ?.record
                                                                                    ?.losses ||
                                                                                0
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const losses =
                                                                                    parseInt(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    ) ||
                                                                                    0;
                                                                                handleOpponentChange(
                                                                                    game.week,
                                                                                    {
                                                                                        ...game.opponent!,
                                                                                        record: {
                                                                                            ...game.opponent!
                                                                                                .record!,
                                                                                            losses: losses,
                                                                                        },
                                                                                    }
                                                                                );
                                                                            }}
                                                                            inputProps={{
                                                                                min: 0,
                                                                                max: 15,
                                                                            }}
                                                                            sx={{
                                                                                width: 60,
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                ) : (
                                                                    game
                                                                        .opponent
                                                                        ?.record && (
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                        >
                                                                            (
                                                                            {
                                                                                game
                                                                                    .opponent
                                                                                    .record
                                                                                    .wins
                                                                            }
                                                                            -
                                                                            {
                                                                                game
                                                                                    .opponent
                                                                                    .record
                                                                                    .losses
                                                                            }
                                                                            )
                                                                        </Typography>
                                                                    )
                                                                )}
                                                                {isEditing ? (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                size="small"
                                                                                checked={
                                                                                    game
                                                                                        .opponent
                                                                                        ?.isRivalry ||
                                                                                    false
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    handleOpponentChange(
                                                                                        game.week,
                                                                                        {
                                                                                            ...game.opponent!,
                                                                                            isRivalry:
                                                                                                e
                                                                                                    .target
                                                                                                    .checked,
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            />
                                                                        }
                                                                        label="Rivalry"
                                                                        sx={{
                                                                            mt: 1,
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    game
                                                                        .opponent
                                                                        ?.isRivalry && (
                                                                        <Chip
                                                                            label="Rivalry"
                                                                            size="small"
                                                                            color="error"
                                                                            sx={{
                                                                                ml: 1,
                                                                                fontSize:
                                                                                    '0.7rem',
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                                {isEditing ? (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                size="small"
                                                                                checked={
                                                                                    game.isConferenceGame ||
                                                                                    false
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    setEditingSchedule(
                                                                                        (
                                                                                            prev
                                                                                        ) =>
                                                                                            prev.map(
                                                                                                (
                                                                                                    g
                                                                                                ) =>
                                                                                                    g.week ===
                                                                                                    game.week
                                                                                                        ? {
                                                                                                              ...g,
                                                                                                              isConferenceGame:
                                                                                                                  e
                                                                                                                      .target
                                                                                                                      .checked,
                                                                                                          }
                                                                                                        : g
                                                                                            )
                                                                                    );
                                                                                }}
                                                                            />
                                                                        }
                                                                        label="Conference"
                                                                        sx={{
                                                                            mt: 1,
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    game.isConferenceGame && (
                                                                        <Chip
                                                                            label="Conference"
                                                                            size="small"
                                                                            color="primary"
                                                                            sx={{
                                                                                ml: 1,
                                                                                fontSize:
                                                                                    '0.7rem',
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                                {isEditing ? (
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                'flex',
                                                                            gap: 1,
                                                                            mt: 1,
                                                                            alignItems:
                                                                                'center',
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            label="Home"
                                                                            type="number"
                                                                            size="small"
                                                                            value={
                                                                                game
                                                                                    .score
                                                                                    ?.home ||
                                                                                0
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const home =
                                                                                    parseInt(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    ) ||
                                                                                    0;
                                                                                setEditingSchedule(
                                                                                    (
                                                                                        prev
                                                                                    ) =>
                                                                                        prev.map(
                                                                                            (
                                                                                                g
                                                                                            ) =>
                                                                                                g.week ===
                                                                                                game.week
                                                                                                    ? {
                                                                                                          ...g,
                                                                                                          score: {
                                                                                                              ...g.score!,
                                                                                                              home: home,
                                                                                                          },
                                                                                                      }
                                                                                                    : g
                                                                                        )
                                                                                );
                                                                            }}
                                                                            inputProps={{
                                                                                min: 0,
                                                                            }}
                                                                            sx={{
                                                                                width: 60,
                                                                            }}
                                                                        />
                                                                        <Typography variant="body2">
                                                                            -
                                                                        </Typography>
                                                                        <TextField
                                                                            label="Away"
                                                                            type="number"
                                                                            size="small"
                                                                            value={
                                                                                game
                                                                                    .score
                                                                                    ?.away ||
                                                                                0
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const away =
                                                                                    parseInt(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    ) ||
                                                                                    0;
                                                                                setEditingSchedule(
                                                                                    (
                                                                                        prev
                                                                                    ) =>
                                                                                        prev.map(
                                                                                            (
                                                                                                g
                                                                                            ) =>
                                                                                                g.week ===
                                                                                                game.week
                                                                                                    ? {
                                                                                                          ...g,
                                                                                                          score: {
                                                                                                              ...g.score!,
                                                                                                              away: away,
                                                                                                          },
                                                                                                      }
                                                                                                    : g
                                                                                        )
                                                                                );
                                                                            }}
                                                                            inputProps={{
                                                                                min: 0,
                                                                            }}
                                                                            sx={{
                                                                                width: 60,
                                                                            }}
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    size="small"
                                                                                    checked={
                                                                                        game.wentToOvertime ||
                                                                                        false
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setEditingSchedule(
                                                                                            (
                                                                                                prev
                                                                                            ) =>
                                                                                                prev.map(
                                                                                                    (
                                                                                                        g
                                                                                                    ) =>
                                                                                                        g.week ===
                                                                                                        game.week
                                                                                                            ? {
                                                                                                                  ...g,
                                                                                                                  wentToOvertime:
                                                                                                                      e
                                                                                                                          .target
                                                                                                                          .checked,
                                                                                                              }
                                                                                                            : g
                                                                                                )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label="OT"
                                                                            sx={{
                                                                                ml: 1,
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                ) : (
                                                                    game.score && (
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                display:
                                                                                    'block',
                                                                            }}
                                                                        >
                                                                            {game.location ===
                                                                            'Home'
                                                                                ? `${game.score.home}-${game.score.away}`
                                                                                : `${game.score.away}-${game.score.home}`}
                                                                            {game.wentToOvertime &&
                                                                                ' (OT)'}
                                                                        </Typography>
                                                                    )
                                                                )}
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            TBD
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Game Details Dialog */}
            <Dialog
                open={gameDialog.open}
                onClose={handleCloseGameDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Game Details</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 1,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        gameDialog.game?.isConferenceGame ||
                                        false
                                    }
                                    onChange={(e) =>
                                        setGameDialog((prev) => ({
                                            ...prev,
                                            game: {
                                                ...prev.game!,
                                                isConferenceGame:
                                                    e.target.checked,
                                            },
                                        }))
                                    }
                                />
                            }
                            label="Conference Game"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        gameDialog.game?.wentToOvertime || false
                                    }
                                    onChange={(e) =>
                                        setGameDialog((prev) => ({
                                            ...prev,
                                            game: {
                                                ...prev.game!,
                                                wentToOvertime:
                                                    e.target.checked,
                                            },
                                        }))
                                    }
                                />
                            }
                            label="Went to Overtime"
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{ mt: 1 }}
                        >
                            Score
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Home Score"
                                    type="number"
                                    value={gameDialog.game?.score?.home || 0}
                                    onChange={(e) =>
                                        setGameDialog((prev) => ({
                                            ...prev,
                                            game: {
                                                ...prev.game!,
                                                score: {
                                                    ...prev.game!.score!,
                                                    home:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                },
                                            },
                                        }))
                                    }
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Away Score"
                                    type="number"
                                    value={gameDialog.game?.score?.away || 0}
                                    onChange={(e) =>
                                        setGameDialog((prev) => ({
                                            ...prev,
                                            game: {
                                                ...prev.game!,
                                                score: {
                                                    ...prev.game!.score!,
                                                    away:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                },
                                            },
                                        }))
                                    }
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGameDialog}>Cancel</Button>
                    <Button
                        onClick={handleSaveGame}
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Opponent Details Dialog */}
            <Dialog
                open={opponentDialog.open}
                onClose={handleCloseOpponentDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Opponent Details</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 1,
                        }}
                    >
                        <TextField
                            label="Opponent Name"
                            value={opponentDialog.opponent?.name || ''}
                            onChange={(e) =>
                                setOpponentDialog((prev) => ({
                                    ...prev,
                                    opponent: {
                                        ...prev.opponent!,
                                        name: e.target.value,
                                    },
                                }))
                            }
                            fullWidth
                        />
                        <TextField
                            label="Logo URL"
                            value={opponentDialog.opponent?.logo || ''}
                            onChange={(e) =>
                                setOpponentDialog((prev) => ({
                                    ...prev,
                                    opponent: {
                                        ...prev.opponent!,
                                        logo: e.target.value,
                                    },
                                }))
                            }
                            fullWidth
                        />
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Rank"
                                    type="number"
                                    value={opponentDialog.opponent?.rank || ''}
                                    onChange={(e) =>
                                        setOpponentDialog((prev) => ({
                                            ...prev,
                                            opponent: {
                                                ...prev.opponent!,
                                                rank:
                                                    parseInt(e.target.value) ||
                                                    undefined,
                                            },
                                        }))
                                    }
                                    inputProps={{ min: 1, max: 25 }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                opponentDialog.opponent
                                                    ?.isRivalry || false
                                            }
                                            onChange={(e) =>
                                                setOpponentDialog((prev) => ({
                                                    ...prev,
                                                    opponent: {
                                                        ...prev.opponent!,
                                                        isRivalry:
                                                            e.target.checked,
                                                    },
                                                }))
                                            }
                                        />
                                    }
                                    label="Rivalry Game"
                                />
                            </Grid>
                        </Grid>
                        <Typography
                            variant="subtitle2"
                            sx={{ mt: 1 }}
                        >
                            Record
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Wins"
                                    type="number"
                                    value={
                                        opponentDialog.opponent?.record?.wins ||
                                        0
                                    }
                                    onChange={(e) =>
                                        setOpponentDialog((prev) => ({
                                            ...prev,
                                            opponent: {
                                                ...prev.opponent!,
                                                record: {
                                                    ...prev.opponent!.record!,
                                                    wins:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                },
                                            },
                                        }))
                                    }
                                    inputProps={{ min: 0, max: 15 }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Losses"
                                    type="number"
                                    value={
                                        opponentDialog.opponent?.record
                                            ?.losses || 0
                                    }
                                    onChange={(e) =>
                                        setOpponentDialog((prev) => ({
                                            ...prev,
                                            opponent: {
                                                ...prev.opponent!,
                                                record: {
                                                    ...prev.opponent!.record!,
                                                    losses:
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0,
                                                },
                                            },
                                        }))
                                    }
                                    inputProps={{ min: 0, max: 15 }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOpponentDialog}>Cancel</Button>
                    <Button
                        onClick={handleSaveOpponent}
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ScheduleWithSave;
