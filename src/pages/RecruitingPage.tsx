import { Box, Typography } from '@mui/material';

export default function RecruitingPage() {
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
                This page will handle recruiting: prospects, scouting, visits,
                and recruiting board.
            </Typography>
        </Box>
    );
}

