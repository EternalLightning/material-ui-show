import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {context} from "./exportType";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "../dashboard/components/SideMenu";
import AppNavbar from "../dashboard/components/AppNavbar";
import {alpha} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Header from "../dashboard/components/Header";
import MainGrid from "../dashboard/pages/MainGrid";
import SystemConfig from "../dashboard/pages/SystemConfig";
import ChargeStationConfig from "../dashboard/pages/ChargeStationConfig";
import Scheme from "../dashboard/pages/Scheme"
import {data as data2} from "../dashboard/internals/data/schemeData2"
import {data as data3} from "../dashboard/internals/data/schemeData3"
import DataCalculation from "../dashboard/pages/DataCalculation";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../dashboard/theme/customizations';
import Copyright from '../dashboard/internals/components/Copyright'


const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};


function MainPage(props: { disableCustomTheme?: boolean, children: any}) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme/>
            <Box sx={{display: 'flex', minHeight: 'calc(100vh - 6em)'}}>
                <SideMenu/>
                <AppNavbar/>
                {/* Main content */}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
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
                </Box>
            </Box>
            <Box flexGrow={1}/>
            <Copyright sx={{my: 4}}/>
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
        path: "/scheme/scheme1",
        element: (
            <MainPage disableCustomTheme={false}>
                <Scheme data={data3}/>
            </MainPage>
        ),
    },
    {
        path: "/scheme/scheme2",
        element: (
            <MainPage disableCustomTheme={false}>
                <Scheme data={data2}/>
            </MainPage>
        ),
    },
    {
        path: "/scheme/scheme3",
        element: (
            <MainPage disableCustomTheme={false}>
                <Scheme data={data3}/>
            </MainPage>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
