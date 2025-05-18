import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useBlogStore } from "../../store/BlogStore";
import { useNavigate } from "react-router-dom";

const Options = () => {

  const navigate = useNavigate()

  const { deletePost , post } =  useBlogStore()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="z-50 shadow-zinc-400 shadow-xl absolute bg-white top-10 right-8 p-2 w-45 rounded-xl"
    >
      <div onClick={()=> {
         deletePost(post._id)
         navigate('/')
      }} className='w-full flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded-xl'>
        <h1 className='text-xl'><i className="ri-delete-bin-6-fill"></i></h1>
        <h1 className='font-semibold'>Delete</h1>
      </div>
      <div className='w-full flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded-xl'>
        <h1 className='text-xl'><i className="ri-edit-line"></i></h1>
        <h1 className='font-semibold'>Edit</h1>
      </div>
    </motion.div>
  );
};

export default Options;