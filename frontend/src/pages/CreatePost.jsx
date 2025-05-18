import React, { useState } from "react";
import { useBlogStore } from "../../store/BlogStore";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
const [selectedImage, setselectedImage] = useState("");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const navigate = useNavigate()

const {createPost} = useBlogStore()

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result;
      setselectedImage(base64String);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !title || !content) {
      alert("Please fill all fields");
      return;   
    }

    const data = {
        image: selectedImage,
        title: title,   
        content: content,
    }

    await createPost(data)

    setselectedImage("");
    setTitle("");
    setContent("");
    navigate('/')


  }
  return (
    <form onSubmit={handleSubmit} className="pb-20 w-full">
      <div className="w-full p-3 flex flex-col items-center justify-center ">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
          id="file_input"
        />
        <label
          htmlFor="file_input"
          className="cursor-pointer w-full rounded-xl bg-red-500 overflow-hidden"
        >
          <img
            className="w-full max-h-[100vh]"
            src={
              selectedImage
                ? selectedImage
                : "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
            }
            alt=""
          />
        </label>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        ></textarea>
        <button className="bg-blue-500 text-white w-full p-2 rounded-md">
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
