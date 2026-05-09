import React from 'react';
import profileImg from "../assets/profile.webp";


function Profile() {
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
        <div className="flex flex-col justify-center items-center gap-[30px]">
            <div className="h-[300px] w-[500px] position-relative flex flex-col justify-center items-center ">
                <img className="h-[200px] w-[200px] border-2 border-dashed border-red-100 rounded-[50%]"
                 src={profileImg} alt="profile pic" />
            </div>
             
             <input type="text" placeholder='name' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
          border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700' />
          
          <input type="email" placeholder='email' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
          border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700' />
          
          <input type="password" placeholder='password' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
          border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700' />
        
        </div>
    </div>
  )
}

export default Profile;
