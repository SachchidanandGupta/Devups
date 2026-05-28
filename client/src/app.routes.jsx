import {createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/pages/Login";    
import Register from "./features/auth/pages/Register";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import Dashboard from "./features/dashboard/pages/Dashboard";

 export const router = createBrowserRouter([
    {   
        path: "/",
        element: <ProtectedRoutes><Dashboard/></ProtectedRoutes>
    },
    {   
        path: "/login",
        element: <Login />
    },
    {   
        path: "/register",
        element: <Register />
    }
]);

