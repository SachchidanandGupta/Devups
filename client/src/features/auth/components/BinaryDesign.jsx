import React from 'react'

const BinaryDesign = () => {
  return (
    <div className="hidden sm:flex flex-col p-1 absolute top-4 left-4 animate-pulse">
        <div className="flex gap-2 text-xs sm:text-sm ">
          <span className="text-accent font-sans">01000100</span>
          <span className="text-accent font-sans">01000101</span>
          <span className="text-accent font-sans">01010110</span>
        </div>
        <div className="flex gap-2 text-xs sm:text-sm">
          <span className="text-accent font-sans">01010101</span>
          <span className="text-accent font-sans">01010000</span>
          <span className="text-accent font-sans">01010011</span>
        </div>
      </div>
  )
}

export default BinaryDesign