import React, { useEffect, useState } from 'react'
import { useBlogStore } from '../../store/BlogStore'
import Post from '../components/Post'
import CommentSection from '../components/CommentSection';

const FullPost = () => {
  const { post , getAllComments,comments } = useBlogStore();
  const [isCommentBar, setisCommentBar] = useState(false)

  
  useEffect(() => {
    if (post) {
      getAllComments(post._id);
    }
  }, [post,comments]);

  if (!post) {
    return <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
  }

  return (
    <div className='w-full h-full p-2 pb-12 overflow-y-scroll scrollbar-hide'>
    <Post
      id={post._id}
      title={post.title}
      image={post.image}
      username={post.author.username}
      profilePic={post.author.profilePic}
      content={post.content}
      setisCommentBar={setisCommentBar}
      />
      <CommentSection postId={post._id}  setisCommentBar={setisCommentBar} isCommentBar={isCommentBar}/>
      </div>
  );
};

export default FullPost;
