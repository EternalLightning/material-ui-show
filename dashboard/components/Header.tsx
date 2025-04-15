import * as React from 'react';
import Stack from '@mui/material/Stack';
import GetCurrentDate from "./GetCurrentDate";
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

export default function Header() {
    return (
        <Stack
            direction="row"
            sx={{
                display: {xs: 'none', md: 'flex'},
                width: '100%',
                alignItems: {xs: 'flex-start', md: 'center'},
                justifyContent: 'space-between',
                maxWidth: {sm: '100%', md: '2000px'},
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs/>
            <Stack direction="row" sx={{gap: 1}}>
                {/*<Search />*/}
                <GetCurrentDate/>
                {/*<MenuButton showBadge aria-label="Open notifications">*/}
                {/*    <NotificationsRoundedIcon/>*/}
                {/*</MenuButton>*/}
                <ColorModeIconDropdown/>
            </Stack>
        </Stack>
    );
}
