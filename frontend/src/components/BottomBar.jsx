import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'


const BottomBar = () => {
  const Location = useLocation()
    const { authUser , isUpdatingProfile } = useAuthStore()
  
  return (
    <div className={`w-[95%] h-[7vh] rounded-xl fixed bottom-3 left-[50%] -translate-x-[50%] flex items-center justify-center bg-black text-white shadow-md px-4 z-[98] ${Location.pathname === '/login' || Location.pathname === '/register' ? 'hidden' : 'block'}`}>
      {
        ['home','search','add-circle','notification-3'].map((icon, index) => {
          return (
            <div key={index} className='w-full h-full flex text-xl items-center justify-center'>
              <Link to={index === 0 ? '/' : icon && index === 2 ? "/create": icon} className='cursor-pointer'>
                <i className={`ri-${icon}-line`}></i>
              </Link>
            </div>
          )
        })
      }
      <div className='w-full h-full flex items-center justify-center'>
        <Link to='/profile' className='w-7 h-7 rounded-full  overflow-hidden'>
          <img className='w-full h-full object-cover' src={authUser ? authUser.profilePic : "https://i.pinimg.com/736x/37/99/40/37994074659781fe22baafe145667e24.jpg"} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default BottomBar