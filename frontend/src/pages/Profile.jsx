import React from 'react';
import profileImg from "../assets/profile.webp";
import { IoCameraOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineShieldCheck } from 'react-icons/hi';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


function Profile() {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-12'>
      <button className="absolute top-4 left-4 z-20" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack className='text-2xl text-black' />
      </button>

      <div className="mesh-gradient" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-[550px] glass p-8 md:p-12 rounded-[3rem] flex flex-col gap-10 relative z-10'
      >
        <div className='text-center'>
          <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200'>
            Your Profile
          </h1>
          <p className='text-indigo-200 mt-2 opacity-80'>Manage your account settings</p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                className="h-40 w-40 object-cover border-4 border-white border-opacity-20 rounded-full shadow-2xl"
                src={userData?.profilePic || profileImg}
                alt="profile"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <IoCameraOutline className='text-white text-3xl' />
              </div>
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-500 p-2 rounded-full shadow-lg">
              <HiOutlineShieldCheck className="text-white text-xl" />
            </div>
          </div>

          <div className='w-full flex flex-col gap-6'>
            <div className='relative group'>
              <HiOutlineUser className='absolute left-4 top-1/2 -translate-y-1/2 text-xl text-indigo-300' />
              <input
                type="text"
                placeholder='Full Name'
                value={userData?.username || ""}
                readOnly
                className='input-field pl-12 bg-opacity-5 cursor-default'
              />
            </div>

            <div className='relative group'>
              <HiOutlineMail className='absolute left-4 top-1/2 -translate-y-1/2 text-xl text-indigo-300' />
              <input
                type="email"
                placeholder='Email Address'
                value={userData?.email || ""}
                readOnly
                className='input-field pl-12 bg-opacity-5 cursor-default'
              />
            </div>

            <div className='bg-indigo-500 bg-opacity-10 rounded-2xl p-4 border border-indigo-500 border-opacity-20'>
              <p className='text-xs text-indigo-300 uppercase tracking-wider font-semibold mb-1'>Account Status</p>
              <p className='text-white font-medium'>Active Member</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='btn-primary w-full mt-2'
            >
              Update Profile
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[150px] opacity-20 animate-pulse" />
    </div>
  )
}

export default Profile;

