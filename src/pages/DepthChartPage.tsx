import { Box, Typography } from '@mui/material';

export default function DepthChartPage() {
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
            <Typography variant="body1">Position depth chart.</Typography>
        </Box>
    );
}

