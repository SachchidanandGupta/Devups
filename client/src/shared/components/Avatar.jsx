import React from 'react'

const Avatar = ({data,style=null}) => {
    const { _id, username = "Unknown", avatar, xp = 0, level = 1 } = data || {};
  return (
     <div className={`w-10 h-10 bg-surface-2 border  flex items-center justify-center shrink-0 ${style ? style : "border-border"}`} >
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-text-secondary text-sm">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
  )
}

export default Avatar