import React from 'react'
import Navbar from './Navbar'
import useSocket from '../hooks/useSocket';

const Layout = ({ children }) => {
  useSocket();
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto ">
        {children}
      </main>
    </div>
  )
}

export default Layout