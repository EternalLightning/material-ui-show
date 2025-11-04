import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {context} from "./exportType";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "./components/SideMenu";
import AppNavbar from "./components/AppNavbar";
import {alpha} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import MainGrid from "./pages/MainGrid";
import SystemConfig from "./pages/SystemConfig";
import ChargeStationConfig from "./pages/ChargeStationConfig";
import Scheme from "./pages/Scheme"
import DataCalculation from "./pages/DataCalculation";
import {chartsCustomizations, dataGridCustomizations,} from './customizations';
import Copyright from './components/Copyright'


const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
};


function MainPage(props: { disableCustomTheme?: boolean, children: any}) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme/>
            <Box sx={{display: 'flex'}}>
                <SideMenu/>
                <AppNavbar/>
                {/* Main content */}
                <Box
                    component="main"
                    flexGrow={1}
                    sx={(theme) => ({
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: {xs: 8, md: 0},
                        }}
                    >
                        <Header/>
                        {props.children}
                    </Stack>
                    <Box flexGrow={1}/>
                    <Copyright sx={{my: 4}}/>
                </Box>
            </Box>

        </AppTheme>
    );
}

function App() {
    const [openSubItems, setOpenSubItems] = React.useState<string | null>(null);

    return (
        <context.Provider value={{openSubItems, setOpenSubItems}}>
            <RouterProvider router={router}/>
        </context.Provider>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainPage disableCustomTheme={false}>
                <MainGrid/>
            </MainPage>
        ),
    },
    {
        path: "/data",
        element: (
            <MainPage disableCustomTheme={false}>
                <ChargeStationConfig />
            </MainPage>
        ),
    },
    {
        path: "/calc",
        element: (
            <MainPage disableCustomTheme={false}>
                <DataCalculation/>
            </MainPage>
        ),
    },
    {
        path: "/settings",
        element: (
            <MainPage disableCustomTheme={false}>
                <SystemConfig />
            </MainPage>
        ),
    },
    {
        path: "/about",
        element: (
            <MainPage disableCustomTheme={false}>
                <p></p>
            </MainPage>
        ),
    },
    {
        path: "/scheme/:name",
        element: (
            <MainPage disableCustomTheme={false}>
                <Scheme/>
            </MainPage>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
