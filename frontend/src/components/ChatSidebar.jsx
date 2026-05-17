import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaPlus } from "react-icons/fa6";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';

const ChatSidebar = ({ conversations, activeChat, onChatSelect }) => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const { userData } = useSelector(state => state.user);

  return (
    <div className="w-full md:w-[320px] lg:w-[350px] flex flex-col border-r border-gray-200 h-full bg-white">
      <div className='flex justify-between p-[5px_15px]'>
        <p className='mt-3 pr-2 text-[18px] font-semibold text-gray-800 italic'>Hello {userData?.name || userData?.username}</p>
        <Avatar
          src={userData.image}
          initials='AB'
          isOnline={true}
          size="h-12 w-12"
        />
      </div>

      {/* Search Header */}
      <div className="p-2 flex items-center gap-2 w-full">
        <div class Name="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-md outline-none focus:border-indigo-400 transition-all text-gray-700 placeholder-gray-400 text-[16px]"
          />
          <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        </div>
        <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100">
          <FaPlus className="text-sm" />
        </button>
      </div>



      {/* Tabs */}
      <div className="px-4 flex border-b border-gray-100">
        {['Personal', 'Groups'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-indigo-900' : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-900"
              />
            )}
          </button>
        ))}
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations?.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onChatSelect(chat)}
            className={`px-4 py-3 flex items-center gap-3 border-b border-black-100 last:border-0 transition-all hover:bg-gray-50 cursor-pointer ${activeChat?._id === chat._id ? 'bg-indigo-50 bg-opacity-40' : ''
              }`}
          >
            <Avatar
              src={chat.image}
              initials={(chat.name || chat.username)?.charAt(0)}
              isOnline={chat.isOnline}
              size="h-11 w-11"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 truncate text-[15px]">{chat.name || chat.username}</h3>
              <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
