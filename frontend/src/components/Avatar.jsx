import React from 'react';

const Avatar = ({ src, initials, isOnline, size = "h-12 w-12" }) => {
  return (
    <div className={`relative ${size} flex-shrink-0`}>
      {src ? (
        <img
          src={src}
          alt="profile"
          className={`${size} rounded-full object-cover border border-gray-200 shadow-sm`}
        />
      ) : (
        <div className={`${size} rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg border border-indigo-200 shadow-sm`}>
          {initials}
        </div>
      )}
      
      {isOnline && (
        <span className="absolute bottom-0.5 right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
      )}
    </div>
  );
};

export default Avatar;
