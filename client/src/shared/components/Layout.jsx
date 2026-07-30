import React from 'react'
import Navbar from './Navbar'
import useSocket from '../hooks/useSocket';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  useSocket();
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-y-auto ">
        <TopBar/>
        <div>{children}</div>
      </main>
    </div>
  )
}

export default Layout