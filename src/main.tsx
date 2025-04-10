import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Dashboard from '../dashboard/Dashboard'
import DataInput from "../dashboard/DataInput";
import Settings from "../dashboard/Settings";
import About from "../dashboard/About"
import DataCalculation from "../dashboard/DataCalculation";

import {RouterProvider, createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard disableCustomTheme={false}/>,
    },
    {
        path: "/data",
        element: <DataInput disableCustomTheme={false}/>,
    },
    {
        path: "/calc",
        element: <DataCalculation disableCustomTheme={false}/>,
    },
    {
        path: "/settings",
        element: <Settings disableCustomTheme={false}/>,
    },
    {
        path: "/about",
        element: <About disableCustomTheme={false}/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
);