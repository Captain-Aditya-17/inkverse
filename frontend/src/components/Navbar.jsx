import React from 'react'

const navbar = () => {
  return (
    <div className='w-full h-[8vh] fixed top-0 text-black left-0 flex items-center justify-between bg-white shadow-md px-4 z-[99]'>
      <h1 className='text-2xl'>Inkverse</h1>
      <i className="ri-chat-3-line text-2xl"></i>
    </div>
  )
}

export default navbar