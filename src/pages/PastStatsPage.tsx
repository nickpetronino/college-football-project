import { Box, Typography } from '@mui/material';

export default function PastStatsPage() {
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
                Season-by-season breakdown of coaching stats.
            </Typography>
        </Box>
    );
}

