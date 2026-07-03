import React from 'react'

const ProfileAvatar = ({data}) => {
    const {avatar,username}  = data || {};
  return (
     <div
      className={` relative w-30 h-30 bg-surface-2 border  flex items-center justify-center shrink-0 border-accent `}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={username}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`text-text-secondary text-8xl  `}>
          {username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  )
}

export default ProfileAvatar