import React from 'react'
import useAuthStore from '../../features/auth/store/authStore'

import {Navigate} from 'react-router'

const ProtectedRoutes = ({children}) => {
  const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);
  const isLoading = useAuthStore((state)=>state.isLoading);
  const isInitialized = useAuthStore((state)=>state.isInitialized);
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!isInitialized){
    return <h1>Initializing...</h1>
  }
    if(isAuthenticated){
        return children
    }else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes