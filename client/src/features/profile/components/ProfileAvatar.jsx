import React from "react";

const ProfileAvatar = ({ data }) => {
  const { avatar, username = "Unknown" } = data || {};

  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-surface-2 border flex items-center justify-center shrink-0 border-accent">
      {avatar ? (
        <img
          src={avatar}
          alt={username}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-text-secondary text-5xl sm:text-7xl font-mono">
          {username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default ProfileAvatar;
