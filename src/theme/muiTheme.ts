import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#000000',
            paper: '#1e1e1e',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a1a1a',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1a1a',
                },
            },
        },
    },
});

