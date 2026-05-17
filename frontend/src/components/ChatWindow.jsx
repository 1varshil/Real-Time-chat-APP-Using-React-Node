import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDotsVertical, HiOutlinePaperClip } from 'react-icons/hi';
import { IoSend } from 'react-icons/io5';
import Avatar from './Avatar';

const ChatWindow = ({ activeChat }) => {
  const [message, setMessage] = useState('');

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
        <p className="text-lg font-medium">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <Avatar
            src={activeChat.image}
            initials={(activeChat.name || activeChat.username)?.charAt(0) || '?'}
            isOnline={activeChat.isOnline}
            size="h-10 w-10"
          />
          <div>
            <h2 className="font-bold text-gray-800 text-lg leading-tight">{activeChat.name || activeChat.username}</h2>
            <p className="text-xs text-gray-500 font-medium">
              Front End Developer
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-600">
          <HiOutlineDotsVertical className="text-xl" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar bg-white">
        <AnimatePresence>
          {activeChat.messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.sentByMe ? 'items-end' : 'items-start'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[70%] px-4 py-3 rounded-xl ${
                  msg.sentByMe
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
              </motion.div>
              <span className="text-[10px] text-gray-400 mt-1.5 font-bold">
                {msg.time}
              </span>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message Input Area */}
      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative flex items-center bg-white border border-gray-200 rounded-md px-4 py-2.5 focus-within:border-indigo-400 transition-all">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write message..."
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>
          
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all">
            <HiOutlinePaperClip className="text-xl" />
          </button>

          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-[#4069E1] hover:bg-blue-700 text-white rounded-md transition-all font-bold text-sm shadow-md"
          >
            <IoSend className="text-base" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
