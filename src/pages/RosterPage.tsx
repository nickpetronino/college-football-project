import { Box, Typography } from '@mui/material';

export default function RosterPage() {
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
            <Typography variant="body1">Full team roster.</Typography>
        </Box>
    );
}

