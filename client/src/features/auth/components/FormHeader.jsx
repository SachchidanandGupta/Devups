import React, { useEffect, useState } from 'react'

const FormHeader = () => {
    const [latency, setLatency] = useState(0);  

    useEffect(()=>{
    const latency = () =>{
      setLatency((Math.random()*20).toFixed(0));
    }
    latency();
    const interval = setInterval(latency,3000);
    return () => clearInterval(interval);
  },[])
  return (
    <div className="w-full flex justify-between items-center py-2 px-3 bg-surface-2 border-b border-border">
          <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 bg-accent"></div>
              <div className="w-3 h-3 bg-warning"></div>
              <div className="w-3 h-3 bg-danger"></div>
            </div>
            <span className="text-text-muted text-xs sm:text-sm truncate uppercase tracking-widest">
              SYSTEM.EXE /AUTH/LOGIN
            </span>
          </div>
          <div className="shrink-0 text-accent text-[10px] sm:text-xs tracking-widest">
            LATENCY: {latency}MS
          </div>
        </div>
  )
}

export default FormHeader