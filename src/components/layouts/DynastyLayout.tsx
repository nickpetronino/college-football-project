import { Box } from '@mui/material';
import DynastyAppBar from '../navigation/DynastyAppBar';
import DynastySideNav from '../navigation/DynastySideNav';

interface DynastyLayoutProps {
    children: React.ReactNode;
}

export default function DynastyLayout({ children }: DynastyLayoutProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'red',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Box>
                <DynastyAppBar />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <DynastySideNav />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
