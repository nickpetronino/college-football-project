import { Box, Typography } from '@mui/material';

export default function TeamHubPage() {
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
                This page will show roster, depth chart, player stats, and
                injuries.
            </Typography>
        </Box>
    );
}

