import React from 'react'
import Login from './features/auth/pages/Login'
import {router} from './app.routes';
import { RouterProvider } from 'react-router-dom';
import useAppInit from './shared/hooks/useAppInit';
// import useDashBoard from './features/dashboard/hooks/useDashBoard';

const App = () => {
  useAppInit();
  // useDashBoard();
  return (
    <RouterProvider router = {router}/>
  )
}

export default App