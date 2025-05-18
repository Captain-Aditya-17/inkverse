import mongoose from 'mongoose';    

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    likes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        comment:{
            type: String,
        },
        date:{
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps: true});


const blog = mongoose.model('blog', blogSchema);

export default blog;