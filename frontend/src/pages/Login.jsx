import React, { useState } from 'react'
import { Router, useNavigate } from 'react-router-dom';
import { Serverurl } from '../main';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Login() {
  
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [show,setShow] =useState(false);
    let [email,setEmail]= useState("");
    let [password,setPassword]= useState("");
    let [loading,setLoading]= useState(false);
    let [err,setErr]= useState("");
    let {userData} = useSelector(state => state.user);
    console.log("userData from login page ", userData);

    const handleSignup = async () => {
      setLoading(true);
      try {
        let result = await axios.post(`${Serverurl}/api/auth/login`, {
         email : email,password:password
        }, {
          withCredentials: true
        });
        setEmail("");
        setPassword("");
        dispatch(setUserData(result.data));
        navigate("/");
        setLoading(false);
        console.log("result is be like : ", result);
      } catch (error) {
        setLoading(false);
        setErr(error.response.data.message);
        console.log("Signup error", error); 
      }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
      shadow-gray-400 flex flex-col gap-[30px] shadow-lg'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]
        shadow-gray-400 shadow-lg flex justify-center items-center'>
                <h1 className='text-gray-600 font-bold text-[30px]'>Login to  
                <span className='text-white p-2'>chatly</span></h1>
        </div>
        <form className='w-full flex flex-col justify-center items-center gap-[20px]'
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        >
        <input type="email" placeholder='Email' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
        border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700'
        onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <div className='relative w-[90%] h-[50px]'>
            <input type={show ? 'text' : 'password'} placeholder='Password' className='w-full h-full text-left px-[20px] py-[10px] rounded-[5px] outline-none
        border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700'
        onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />

        {password.length > 0 && (
  <span
    className="absolute top-[10px] right-[10px] text-[19px] cursor-pointer text-[#20c7ff] font-[semibold]"
    onClick={() => setShow(prev => !prev)}
  >
    {show ? "hide" : "show"}
  </span>
)}

        
        </div> 
       
       {err && <p className='text-red-500'>{err}</p>}

        <button className='bg-[#20c7ff] rounded-2xl shadow-gray-400
        shadow-lg width-[200px] px-[20px] py-[10px] font-semibold hover:shadow-inner
        disabled={loading}'> 
        

        {loading ? "Loading..." : "Login"} </button>
        <p onClick={() => navigate("/signup")}>Want to create a New Account ? <span 
        
        className='text-[bold]  text-[#20c7ff] hover:underline cursor-pointer'>Signup</span></p>
      </form>
      </div>
      
    </div>
  )
}

export default Login
