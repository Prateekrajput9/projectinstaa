import mongoose, { Schema } from "mongoose"

const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
         required:true,
    },
     gender:{
        type: String,
        required:true,
        enum: ["male","female"],

    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
      followering:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    profilePic:{
        id:String,
        url:String,
    }
},{
    timestamps:true
,
});
const User= mongoose.model("User",UserSchema);
export default User;