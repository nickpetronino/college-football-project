import { Box, Typography } from '@mui/material';

export default function YourCareerPage() {
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
                This page will show coach metadata, career wins/losses, teams
                coached, and achievements.
            </Typography>
        </Box>
    );
}

