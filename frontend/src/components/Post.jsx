import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogStore } from "../../store/BlogStore";
import Options from "./Options";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/AuthStore";

const Post = ({ title, image, content, username, profilePic, id , setisCommentBar,authorId }) => {
  const { getBlogById , post , getBlogsByUser } = useBlogStore();
  const { authUser,getUserById} = useAuthStore()
  const [isOption, setisOption] = useState(false);
  const navigate = useNavigate()
  

  return (
    <div className="w-full py-2 flex flex-col gap-2 mb-4 relative">
      <AnimatePresence>{isOption && <Options />}</AnimatePresence>
      <div className="w-full py-2">
        <div onClick={()=> {
          getUserById(authorId)
          getBlogsByUser(authorId)
          navigate("/other-profile")
        }} className="h-10 flex items-center justify-between px-2">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={profilePic}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-md font-semibold">{username}</h1>
            </div>
          </div>
          { 
            authUser?.username === post?.author?.username && (
              <div
                className="cursor-pointer"
                onClick={() => setisOption(!isOption)}
              >
                <i className="ri-more-2-fill text-xl"></i>
              </div>
            )
          }
        </div>
      </div>
      <Link
        to={`/post/${id}`}
        onClick={() => getBlogById(id)}
        className="w-full px-2"
      >
        <div className="w-full rounded-2xl overflow-hidden">
          <img className="w-full max-h-[70vh]" src={image} alt="" />
        </div>
        <div className="w-full flex items-center gap-4 h-10 mt-2">
          <i class="ri-heart-line text-3xl cursor-pointer"></i>
          <div onClick={()=> setisCommentBar(true)}>
          <i class="ri-chat-3-line text-3xl cursor-pointer"></i>
          </div>
        </div>
        <div>
          <h1 className="text-xl  font-bold">{title}</h1>
          <h1 className="text-md  font-semibold">{content}</h1>
        </div>
      </Link>
    </div>
  );
};

export default Post;
