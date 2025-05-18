import { create } from "zustand";
import { Instance } from "../utils/axios";
import toast from "react-hot-toast";

export const useBlogStore = create((set)=>({
    posts: [],
    post: null,
    comments: [],
    createPost: async (data)=>{
        try {
            const res = await Instance.post('/blog/create-blog',data);
            if(res.status === 201){
                set((state) => ({
                    posts: [...state.posts, res.data.newBlog]
                }));
            }
            console.log("Post created successfully:", res.data.newBlog);    
        } catch (error) {
            console.log("Error in createPost:", error);
            toast.error(error.response?.data?.msg || "Failed to create post");
        }
    },
    getPosts: async ()=>{
        try {
            const res = await Instance.get('/blog/getall-blog');
            if(res.status === 200){
                set({posts: res.data.blogs});
            }
        } catch (error) {
            console.log("Error in getPosts:", error);
            toast.error(error.response?.data?.msg || "Failed to fetch posts");
        }
    },

      getBlogById: async (id)=>{
        try {
          const res = await Instance.get(`/blog/get-blog/${id}`);
          const blog = res.data.blog;
          set({ post: blog });
        } catch (error) {
          console.log("Error in getBlogById:", error);
          toast.error(error.response?.data?.msg || "Failed to fetch blog");
        }
      },
      getBlogsByUser: async (id)=>{
        try {
            const res = await Instance.get(`/blog/get-blogsBy-user/${id}`);
                set({posts: res.data.blogs});
        } catch (error) {
            console.log("Error in getBlogsByUser:", error);
            toast.error(error.response?.data?.msg || "Failed to fetch user's blogs");
        }
      },
      deletePost: async (id)=>{
        try {
            const res = await Instance.get(`/blog/delete-blog/${id}`);
            if(res.status === 200){
                set((state) => ({
                    posts: state.posts.filter((post) => post._id !== id)
                }));
            }
        } catch (error) {
            console.log("Error in deletePost:", error);
            toast.error(error.response?.data?.msg || "Failed to delete post");
        }
      },
      commentOnPost: async (id,comment)=>{
        try {
            const res = await Instance.post(`/blog/comment/${id}`, { comment });
            if(res.status === 200){
                set((state) => ({
                    posts: state.posts.map((post) => {
                        if(post._id === id){
                            return {
                                ...post,
                                comments: [...post.comments, res.data.comment]
                            }
                        }
                        return post;
                    })
                }));
            }
        } catch (error) {
            console.log("Error in CommentPost:", error);
            toast.error(error.response?.data?.msg || "Failed to comment on post");
        }
      },
      getAllComments: async (id)=>{
        try {
            const res = await Instance.get(`/blog/getAll-comments/${id}`);
            set({comments: res.data.comments});
        } catch (error) {
            console.log("Error in getAllComments:", error);
            toast.error(error.response?.data?.msg || "Failed to fetch comments");
        }
      }
}))

