import React from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useBlogStore } from '../../store/BlogStore';
import PostCard from '../components/PostCard';
const Profile = () => {
  
  const { authUser , isUpdatingProfile  } = useAuthStore()
  const { posts, getBlogsByUser } = useBlogStore()

  if(!posts){
    return  <div role="status" class="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
    </div>
  }
  
  useEffect(() => {
      getBlogsByUser(authUser._id);
    }, []);

  return (
    <div>
    <div className='w-full p-2'>
      <div className='w-full relative'>
      <div className='w-full h-[24vh] rounded-2xl bg-red-500 overflow-hidden'>
        <img className='w-full h-full object-cover object-center' src="https://i.pinimg.com/736x/2f/51/4f/2f514f2e315e6ded94f43a28ae4b01a3.jpg" alt="" />
      <div className='w-[22vw] h-[22vw] border-4 rounded-full border-white absolute -bottom-15 left-[50%] -translate-x-[50%] bg-red-500 overflow-hidden '>
        <img className='w-full h-full object-cover' src={ authUser.profilePic || 'https://i.pinimg.com/736x/37/99/40/37994074659781fe22baafe145667e24.jpg'} alt="" />
      </div>
      </div>
      </div>
      <div className='w-full  flex items-center justify-around'>
        <div>
          <h1 className='font-semibold text-xl text-center'>56k</h1>
        <h1 className='text-sm text-gray-500'>Followers</h1>
        </div>
        <div>
          <h1 className='font-semibold text-xl text-center'>20.3k</h1>
        <h1 className='text-sm text-gray-500'>Following</h1>
        </div>
      </div>
      <div className='flex justify-center mt-5 '>
        <h1 className='text-2xl font-semibold text-center'>{authUser ? authUser.username : 'username'}</h1>
      </div>
      
      {
        isUpdatingProfile ? 
        <div className='flex flex-col justify-start w-full mt-5 '>
        <h1 className='text-2xl font-semibold'>About</h1>
        <p className='w-full text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eaque suscipit ullam recusandae libero! Distinctio cum repudiandae quas fugit, impedit recusandae quasi fuga optio delectus corporis veniam eaque quae necessitatibus.</p>
      </div>
      :
      <Link to='/update' >
      <div className='w-full bg-[#A975FF] rounded-xl cursor-pointer p-3 text-center mt-5 text-white font-medium '>Edit Profile</div> 
      </Link>
      }
    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-2'>
       {
              posts.map((post, index) => {
                return <PostCard key={index} id={post._id} title={post.title} image={post.image} username={post.author.username} profilePic={post.author.profilePic} content={post.content} />;
              })}
    </div>
    </div>
  )
}

export default Profile