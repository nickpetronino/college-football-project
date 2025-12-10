import { Box, Typography } from '@mui/material';

export default function CFBLandscapePage() {
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
                This page will display conferences, teams, school records, and
                coach records vs. conferences.
            </Typography>
        </Box>
    );
}

