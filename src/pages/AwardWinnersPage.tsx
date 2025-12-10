import { Box, Typography } from '@mui/material';

export default function AwardWinnersPage() {
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
                Awards and trophies earned during your career.
            </Typography>
        </Box>
    );
}

