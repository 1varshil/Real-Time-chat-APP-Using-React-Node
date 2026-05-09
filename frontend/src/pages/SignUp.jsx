import {React ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Serverurl } from '../main';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function SignUp() {
  let navigate = useNavigate();
  let [show,setShow] =useState(false);
  let [userName,setuserName]= useState("");
  let [email,setEmail]= useState("");
  let [password,setPassword]= useState("");
  let [loading,setLoading]= useState(false);
  let [err,setErr]= useState("");
  let dispatch = useDispatch();

  const handleSignup = async () => {
    if (!userName || !email || !password) {
    alert("Please fill all fields");
    return;
  }

    setLoading(true);
    try {
      let result = await axios.post(`${Serverurl}/api/auth/signup`, {
        username: userName,email : email,password:password
      }, {
        withCredentials: true
      });
      setLoading(false);
      console.log("result is be like : ", result);
      dispatch(setUserData(result.data));
      setuserName("");
      setEmail("");
      setPassword("");
      setErr("");

      if(result.status === 201){
        alert("Signup Successful");
              navigate("/login");
      }
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
      console.log("Signup error", error); 
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
      shadow-gray-400 flex flex-col gap-[30px] shadow-lg'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]
        shadow-gray-400 shadow-lg flex justify-center items-center'>
                <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to  
                <span className='text-white p-2'>chatly</span></h1>
        </div>
        <form className='w-full flex flex-col justify-center items-center gap-[20px]'
        onSubmit = {(e => {
          e.preventDefault();
          handleSignup();
        })}
        >
        <input type="text" placeholder='Username' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
        border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700'
          onChange={(er) => {
            setuserName(er.target.value)
          }}
          value={userName}
        />
        <input type="email" placeholder='Email' className='w-[90%] h-[50px] text-left px-[20px] py-[10px] rounded-[5px] outline-none
        border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700'
          onChange={(er) => {
            setEmail(er.target.value)
          }}
          value={email}
        />
        <div className='relative w-[90%] h-[50px]'>
            <input type={show ? 'text' : 'password'} placeholder='Password' className='w-full h-full text-left px-[20px] py-[10px] rounded-[5px] outline-none
        border-2 border-[#20c7ff] shadow-lg shadow-gray-200 text-gray-700'
          onChange={(er) => {
            setPassword(er.target.value)
          }}
          value={password}
        />

        <span className='absolute top-[10px] right-[10px] text-[19px] cursor-pointer text-[#20c7ff] font-[semibold]'
        onClick={() => setShow(prev => !prev)}
        >{show? 'hide' : 'show'}</span>
        </div> 

        {err && <p className='text-red-500'>{err}</p>}
        
       
        <button className='bg-[#20c7ff] rounded-2xl shadow-gray-400
        shadow-lg width-[200px] px-[20px] py-[10px] font-semibold hover:shadow-inner
        disabled={loading}'>
        {loading ? "Loading..." : "Sign up"}  </button>
        <p onClick={() => navigate("/login")}>Already Have An Account ? <span 
        
        className='text-[bold]  text-[#20c7ff] hover:underline cursor-pointer'>Login</span></p>
      </form>
      </div>
      
    </div>
  )
}

export default SignUp
