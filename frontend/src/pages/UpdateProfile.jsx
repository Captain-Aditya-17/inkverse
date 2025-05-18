import React, { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";

const UpdateProfile = () => {
  const [selectedImage, setselectedImage] = useState("");

  const { authUser, checkAuth, isUpdatingProfile, updateProfile } =
    useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result;
      setselectedImage(base64String);
      await updateProfile({ profilePic: base64String });
    };
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center ">
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageUpload}
        id="file_input"
      />
      <label
        htmlFor="file_input"
        className="cursor-pointer w-[25vw] h-[25vw] rounded-full bg-red-500 overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={
            isUpdatingProfile
              ? selectedImage ||
                authUser?.profilePic ||
                "https://i.pinimg.com/236x/a1/d7/38/a1d738132d530ca981e5252d5b5267be.jpg"
              : authUser?.profilePic ||
                "https://i.pinimg.com/236x/a1/d7/38/a1d738132d530ca981e5252d5b5267be.jpg"
          }
          alt=""
        />
      </label>
      <h1 className="text-xl font-semibold mt-3">Profile</h1>
    </div>
  );
};

export default UpdateProfile;
