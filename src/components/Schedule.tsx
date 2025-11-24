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
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { FBSSchools } from '../data/fbsSchools';

interface ScheduleGame {
    week: number;
    location: 'Home' | 'Away';
    opponent: {
        name: string;
        logo: string;
    } | null;
    isByeWeek: boolean;
}

const Schedule: React.FC = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [schedule, setSchedule] = useState<ScheduleGame[]>([]);
    const [editingSchedule, setEditingSchedule] = useState<ScheduleGame[]>([]);

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
        opponent: { name: string; logo: string } | null
    ) => {
        setEditingSchedule((prev) =>
            prev.map((game) =>
                game.week === week ? { ...game, opponent } : game
            )
        );
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
                                                <Autocomplete
                                                    value={game.opponent}
                                                    onChange={(_, newValue) =>
                                                        handleOpponentChange(
                                                            game.week,
                                                            newValue
                                                        )
                                                    }
                                                    options={FBSSchools}
                                                    getOptionLabel={(option) =>
                                                        option?.name || ''
                                                    }
                                                    isOptionEqualToValue={(
                                                        option,
                                                        value
                                                    ) =>
                                                        option?.name ===
                                                        value?.name
                                                    }
                                                    renderInput={(params) => (
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
                                                                display: 'flex',
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
                                                    sx={{ minWidth: 200 }}
                                                />
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
                                                            <Typography variant="body1">
                                                                {
                                                                    game
                                                                        .opponent
                                                                        .name
                                                                }
                                                            </Typography>
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
        </Box>
    );
};

export default Schedule;
