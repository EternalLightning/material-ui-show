import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Dashboard from '../dashboard/Dashboard'
import DataInput from "../dashboard/DataInput";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard disableCustomTheme={false}/>,
    },
    {
        path: "/data",
        element: <DataInput disableCustomTheme={false}/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);