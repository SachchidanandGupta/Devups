import {createBrowserRouter} from "react-router-dom";

import Login from "./features/auth/pages/Login";    
import Register from "./features/auth/pages/Register";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";

 export const router = createBrowserRouter([
    {   
        path: "/",
        element: <ProtectedRoutes><h1>Home</h1></ProtectedRoutes>
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

