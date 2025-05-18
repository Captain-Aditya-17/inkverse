import blogModel from '../models/blog.model.js';
import cloudinary from '../config/cloudinary.js';

export const createBlog = async (req,res)=>{
    const {title, content , image} = req.body;
    const author = req.user._id;
    if(!title || !content || !image){
        return res.status(400).json({msg: 'Please fill all fields'});
    }
    try {

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image,{
                folder: 'blog'
            })
            imageUrl = uploadResponse.secure_url;
        }
        const newBlog =  new blogModel({
            title,
            content,
            author,
            image: imageUrl
        })

        await newBlog.save();

        res.status(201).json({newBlog});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
    }
}


export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await blogModel.find().populate('author', 'username email profilePic').sort({createdAt: -1});
        res.status(200).json({blogs});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
    }
}
 
export const deleteBlog = async (req,res)=>{
    const { id } = req.params;
    try {
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'});
        } 
        if(blog.author.toString() !== req.user._id.toString()){
            return res.status(403).json({msg: 'You are not authorized to delete this blog'});
        }
        await blog.deleteOne();

        res.status(200).json({ msg: 'Blog deleted successfully' });
    }
        catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
    }
}

export const getBlogById = async (req,res)=>{
    const { id } = req.params;
    try {
        const blog = await blogModel.findById(id).populate('author', 'username email profilePic');
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'});
        }
        res.status(200).json({blog});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
    }
}

export const commentOnBlog = async (req,res)=>{
    const { id } = req.params;
    const {comment} = req.body;
    try {
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'});
        }
        if(!comment){
            return res.status(400).json({msg: 'Please fill all fields'});
        }
        blog.comments.push({
            user: req.user._id,
            comment
        })
        
        await blog.save();
        res.status(200).json({msg: 'Comment added successfully'});


    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
    }
}

export const getBlogsByUser = async (req,res)=>{
    const userId = req.params.id || req.user._id;
    try {
        const blogs = await blogModel.find({author: userId}).populate('author', 'username email profilePic').sort({createdAt: -1});
        if(!blogs){
            return res.status(404).json({msg: 'No blogs found'});
        }

        res.status(200).json({blogs});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
        
    }
}

export const getAllComments = async (req,res)=>{
    const {id} = req.params;
    try {
        const blog = await blogModel.findById(id).populate('comments.user', 'username email profilePic');
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'});
        }

         res.status(200).json({ comments: blog.comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'});
        
    }
}