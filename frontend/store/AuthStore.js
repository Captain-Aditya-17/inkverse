import { create } from "zustand";
import { Instance } from "../utils/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  updatedUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  profileUser: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await Instance.get("/user/check");
      set({ authUser: res.data });
      
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
      toast.error(error.response?.data?.msg || "Failed to check authentication");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await Instance.post("/user/register", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in register:", error);
      toast.error(error.response?.data?.msg || "Registration failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await Instance.post("/user/login", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in signup:", error);
      toast.error(error.response?.data?.msg || "Login failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

 
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    const { authUser } = get();
    try {
      const res = await Instance.put("/user/update", data);
      set({ authUser: res.data });
      console.log(res.data)
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Profile updated successfully");
      console.log(authUser);
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  getUserById: async (id) => {
    try {
      const res = await Instance.get(`/user/getuser/${id}`);
      set({ profileUser: res.data });
    } catch (error) {
      console.log("Error in getUserById:", error);
      toast.error(error.response?.data?.msg || "Failed to fetch user");
    }
  },

}));
