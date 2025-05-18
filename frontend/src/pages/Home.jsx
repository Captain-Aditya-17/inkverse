import React, { useEffect } from 'react'
import Post from '../components/Post'
import Navbar from '../components/Navbar'
import { useBlogStore } from '../../store/BlogStore'

const Home = () => {
  const {posts,getPosts} = useBlogStore()

  useEffect(()=>{
    getPosts()
  },[])
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
  return (
    <div className='w-full h-full p-2 pb-12 overflow-y-scroll pt-18 scrollbar-hide'>
      <Navbar/>
      <div>
      {
        posts.map((post, index) => {
          return <Post key={index} id={post._id} title={post.title} image={post.image} username={post.author.username} profilePic={post.author.profilePic} content={post.content} authorId={post.author._id}/>;
        })}
    </div>
    </div>
  )
}

export default Home