import mongoose from 'mongoose';

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to MongoDB successfully")
    })
}
export default connectToDb;