import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import { FiLogOut } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useSelector } from 'react-redux'

// Mock Data
const DUMMY_CONVERSATIONS = [
  {
    id: 1,
    name: 'Mehedi Hasan',
    lastMessage: 'Hey, Are you there?',
    time: '10:06 am',
    isOnline: true,
    messages: [
      { text: 'Hey, Are you there?', time: '10:06 am', sentByMe: false },
      { text: 'I need some help with the project', time: '10:07 am', sentByMe: false },
      { text: 'Sure, I am here. What do you need?', time: '10:08 am', sentByMe: true },
    ]
  },
  {
    id: 2,
    name: 'Ryhan',
    lastMessage: 'Frontend Developer',
    time: 'Yesterday',
    isOnline: true,
    messages: []
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    lastMessage: 'The designs look great!',
    time: 'Tuesday',
    isOnline: false,
    messages: []
  },
  {
    id: 4,
    name: 'John Doe',
    lastMessage: 'Meeting at 5 PM',
    time: 'Monday',
    isOnline: false,
    messages: []
  }
];

function Home() {
  const [activeChat, setActiveChat] = useState();
  const dispatch = useDispatch();
  const otherUsers = useSelector(state => state.user.otherUsers);

  const handleLogout = async () => {
    try {
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-0 bg-gray-50 overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-full h-screen md:h-[100vh] bg-white rounded-none md:rounded-xl flex overflow-hidden border border-gray-200 shadow-xl relative z-10"
      >
        <ChatSidebar
          // conversations={DUMMY_CONVERSATIONS}
          conversations={otherUsers}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
        />
        <ChatWindow activeChat={activeChat} onBack={() => setActiveChat(null)} />

        <button 
          className={`absolute bottom-2 left-3 text-gray-500 hover:text-red-500 transition-colors z-20 bg-blue p-2 rounded-full shadow-md ${
            activeChat ? 'hidden md:block' : 'block'
          }`}
          onClick={handleLogout}
        >
          <FiLogOut size={24} />
        </button>
      </motion.div>
    </div>
  )
}

export default Home
