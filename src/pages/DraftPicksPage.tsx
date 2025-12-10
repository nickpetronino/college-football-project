import { Box, Typography } from '@mui/material';

export default function DraftPicksPage() {
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
                Players drafted into the NFL from your teams.
            </Typography>
        </Box>
    );
}

