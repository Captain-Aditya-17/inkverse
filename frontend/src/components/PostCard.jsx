import React from "react";
import { useBlogStore } from "../../store/BlogStore";
import { Link } from "react-router-dom";

const PostCard = ({ image, title , id }) => {
  const { getBlogById } = useBlogStore();
  return (
    <Link
      to={`/post/${id}`}
      onClick={() => getBlogById(id)}
      className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </Link>
  );
};

export default PostCard;
