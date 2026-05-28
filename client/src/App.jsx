import React from 'react'
import Login from './features/auth/pages/Login'
import {router} from './app.routes';
import { RouterProvider } from 'react-router-dom';
import useAppInit from './shared/hooks/useAppInit';
import useSocket from './shared/hooks/useSocket';



const App = () => {
  useSocket();
  useAppInit();
 
 
  return (
    <RouterProvider router = {router}/>
  )
}

export default App