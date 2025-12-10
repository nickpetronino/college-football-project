import { Box, Typography } from '@mui/material';

export default function PlayerStatsPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%',
                p: 4,
            }}
        >
            <Typography variant="body1">
                Individual player statistics.
            </Typography>
        </Box>
    );
}

