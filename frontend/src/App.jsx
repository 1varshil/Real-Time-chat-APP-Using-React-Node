import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Profile from "./pages/Profile.jsx";
import useCurrentUser from './custom-hooks/getCurrentUser.jsx';
 import { useSelector } from 'react-redux';

function App() {
  useCurrentUser();

  let {userData} = useSelector(state => state.user);

  return (
    <Routes>
      <Route path="/" element= {userData? <Home /> : <Login />} />
      <Route path="/profile" element= {userData? <Profile /> : <SignUp />} />
      <Route path="/signup" element={!userData? <SignUp /> : <Home />} />
      <Route path="/login" element={!userData? <Login /> : <Home />} />
    </Routes>
  )
}

export default App
