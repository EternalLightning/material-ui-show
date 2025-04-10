import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Dashboard from '../dashboard/Dashboard'
import DataInput from "../dashboard/DataInput";
import Settings from "../dashboard/Settings";
import About from "../dashboard/About"
import DataCalculation from "../dashboard/DataCalculation";
import ShowScheme from "../dashboard/ShowScheme";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {MenuSubItemsContext} from "../dashboard/components/MenuContent";

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
    {
        path: "/scheme/scheme1",
        element: <ShowScheme disableCustomTheme={false} scheme={1}/>,
    },
    {
        path: "/scheme/scheme2",
        element: <ShowScheme disableCustomTheme={false} scheme={2}/>,
    },
    {
        path: "/scheme/scheme3",
        element: <ShowScheme disableCustomTheme={false} scheme={3}/>,
    },
]);

function App() {
    const [openSubItems, setOpenSubItems] = React.useState<string | null>(null);
    return (
        <MenuSubItemsContext.Provider value={{openSubItems, setOpenSubItems}}>
            <RouterProvider router={router}/>
        </MenuSubItemsContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
