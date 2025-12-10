import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Avatar,
    CircularProgress,
} from '@mui/material';
import { getCoachByPlaythroughId, type Coach } from '../../utils/coachApi';
import type { School } from '../../utils/schoolApi';

export default function DynastyAppBar() {
    const { coachId } = useParams<{ coachId: string }>();
    const [coach, setCoach] = useState<Coach | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCoachData = async () => {
            if (!coachId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const coachData = await getCoachByPlaythroughId(coachId);
                setCoach(coachData);
            } catch (err) {
                console.error('Error loading coach data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadCoachData();
    }, [coachId]);

    // Helper to check if school is populated
    const isSchoolPopulated = (school: School | string): school is School => {
        return typeof school === 'object' && school !== null && '_id' in school;
    };

    const selectedTeam =
        coach && isSchoolPopulated(coach.selectedTeam)
            ? coach.selectedTeam
            : null;

    const coachName = coach ? `${coach.firstName} ${coach.lastName}` : '';

    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexGrow: 0,
                    }}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            color="inherit"
                        />
                    ) : selectedTeam ? (
                        <>
                            <Avatar
                                src={selectedTeam.icon}
                                alt={selectedTeam.name}
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                            >
                                {selectedTeam.name}
                            </Typography>
                        </>
                    ) : null}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 0,
                    }}
                >
                    {!loading && coachName && (
                        <Typography
                            variant="h6"
                            component="div"
                        >
                            {coachName}
                        </Typography>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

