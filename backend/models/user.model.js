import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        select: false,
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default: ""
    },
    

});

userSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password,10);
};

userSchema.methods.comparePassword = async function (password) {
    if (!this.password) throw new Error("Password not set for user");
    return bcrypt.compare(password, this.password);
};


userSchema.methods.generateAuth = function(){
    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        profilePic: this.profilePic,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const userModel = mongoose.model("user",userSchema);
export default userModel;