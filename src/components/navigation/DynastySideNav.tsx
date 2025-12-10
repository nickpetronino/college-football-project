import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

interface NavItem {
    label: string;
    path?: string;
    children?: NavItem[];
}

export default function DynastySideNav() {
    const { coachId } = useParams<{ coachId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        'Your Career': false,
        'Team Hub': false,
    });

    const navItems: NavItem[] = [
        { label: 'Home', path: `/${coachId}` },
        { label: 'CFB Landscape', path: `/${coachId}/cfb` },
        {
            label: 'Your Career',
            path: `/${coachId}/career`,
            children: [
                { label: 'Past Stats', path: `/${coachId}/career/past-stats` },
                { label: 'Award Winners', path: `/${coachId}/career/awards` },
                { label: 'Draft Picks', path: `/${coachId}/career/draft-picks` },
            ],
        },
        {
            label: 'Team Hub',
            path: `/${coachId}/team`,
            children: [
                { label: 'Roster', path: `/${coachId}/team/roster` },
                { label: 'Depth Chart', path: `/${coachId}/team/depth-chart` },
            ],
        },
        { label: 'Recruiting', path: `/${coachId}/recruiting` },
    ];

    const handleToggle = (label: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const renderNavItem = (item: NavItem, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSections[item.label] || false;
        const isSelected = item.path ? location.pathname === item.path : false;

        return (
            <ListItem
                key={item.label}
                disablePadding
            >
                <Box sx={{ width: '100%' }}>
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => {
                            if (item.path) {
                                handleNavigation(item.path);
                            }
                            if (hasChildren) {
                                handleToggle(item.label);
                            }
                        }}
                        sx={{ pl: 2 + level * 2 }}
                    >
                        <ListItemText primary={item.label} />
                        {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {hasChildren && (
                        <Collapse
                            in={isOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {item.children?.map((child) => (
                                    <ListItem
                                        key={child.label}
                                        disablePadding
                                    >
                                        <ListItemButton
                                            selected={location.pathname === child.path}
                                            onClick={() => {
                                                if (child.path) {
                                                    handleNavigation(child.path);
                                                }
                                            }}
                                            sx={{ pl: 4 + level * 2 }}
                                        >
                                            <ListItemText primary={child.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </Box>
            </ListItem>
        );
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                },
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <List>{navItems.map((item) => renderNavItem(item))}</List>
            </Box>
        </Drawer>
    );
}

