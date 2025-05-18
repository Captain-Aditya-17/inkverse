import userModel from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';

export const register = async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try {

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        })

        const token = user.generateAuth();
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        

        res.json({user,token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuth();
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        
        res.json({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth  = async (req,res)=>{
    try {
        res.json(req.user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;


    if (!profilePic) {
      return res.status(400).json({ msg: 'Please provide a profile picture' });
    }

    console.log('Uploading profile picture...');
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    if (!uploadResponse || !uploadResponse.secure_url) {
      return res.status(400).json({ msg: 'Failed to upload profile picture' });
    }
    console.log('Updating user profile...');
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    console.error('Update Error:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const logout = async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message:"Logout successful"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"});
    }
} 

export const getUserById = async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await userModel.findById(id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"});
    }
}