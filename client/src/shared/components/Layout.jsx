import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout