import { Box, Typography } from '@mui/material';

export default function DynastyHomePage() {
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
                This is the Home page. It will show latest results, upcoming
                schedule, and quick links.
            </Typography>
        </Box>
    );
}
