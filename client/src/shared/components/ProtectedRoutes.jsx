import React from 'react'
import useAuth from '../../features/auth/hooks/useAuth'
import {Navigate} from 'react-router'
import DevUpsInitializer from './DevUpsInitializer';

const ProtectedRoutes = ({children}) => {
  const {isAuthenticated,isLoading,isInitialized} = useAuth();
  if(!isInitialized){
    return <DevUpsInitializer/>
  }
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isAuthenticated){
    return children
  }else{
    return <Navigate to="/login" />
  }
}

export default ProtectedRoutes