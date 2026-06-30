import React from 'react'
import useActivityLog from '../../features/activityLog/hooks/useActivityLog';
const Terminal = () => {
    const {fetchActivity} = useActivityLog;
  return (
    <div className=' z-10 absolute bottom-0 left-0 border border-border h-50 w-full bg-blue-500'>
        
    </div>
  )
}

export default Terminal