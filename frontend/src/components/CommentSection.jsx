import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogStore } from '../../store/BlogStore';

const CommentSection = ({ setisCommentBar, isCommentBar }) => {
  const [comment, setComment] = useState('');
  const {commentOnPost,post,comments} = useBlogStore()

  const handleSend = () => {
    if (comment.trim() !== '') {
      commentOnPost(post._id,comment);
      setComment('');
    }
  };



  return (
    <AnimatePresence>
      {isCommentBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-white p-4 w-full h-[60vh] rounded-t-2xl bg-black absolute bottom-0 left-0 z-[99] shadow-xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between mb-2">
            <h1 className="text-center text-2xl font-semibold text-zinc-500">Comments</h1>
            <div onClick={() => setisCommentBar(false)}>
              <i className="ri-close-line text-3xl cursor-pointer"></i>
            </div>
          </div>

          {/* Placeholder for comment list (future) */}
          <div className="flex-1 overflow-y-auto mt-5 ">
         {
          comments.map((comment)=>{
            return (
                 <div className='w-full flex items-center gap-4 mb-8'>
              <div className='w-12 h-12 overflow-hidden rounded-full flex-shrink-0'>
                <img className='w-full h-full object-cover' src={comment.user.profilePic} alt="" />
              </div>
              <div>
                <h1 className='text-lg font-semibold text-zinc-100'>{comment.user.username}</h1>
                <p className='text-sm text-zinc-400'>{comment.comment}</p>
              </div>
            </div>
            )
          })
         }
          </div>

          {/* Comment Input */}
          <div className="w-full flex items-center gap-2 mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 py-2 px-6 rounded-lg bg-zinc-800 text-white outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white font-medium transition"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;
