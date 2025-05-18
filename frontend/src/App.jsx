import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import './App.css'
import BottomBar from './components/BottomBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { useAuthStore } from '../store/AuthStore'
import { Loader } from 'lucide-react'
import UpdateProfile from './pages/UpdateProfile'
import CreatePost from './pages/CreatePost';
import FullPost from './pages/FullPost';
import OtherProfile from './pages/OtherProfile';

const App = () => {

  const { authUser , checkAuth,isCheckingAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser) {
    return <div className="w-full h-screen flex items-center justify-center">
      <Loader className="animate-spin text-white size-10" size={40} />
    </div>;
  }



  return (
    <div className='w-full h-screen bg-white p-2'>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/'/>} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to='/'/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/other-profile" element={<OtherProfile />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<FullPost />} />
      </Routes>
    <BottomBar/>
    </div>
  )
}

export default App