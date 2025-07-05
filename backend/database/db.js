import mongoose from 'mongoose'
export const connectDb =async() =>{
    try{
await mongoose.connect(process.env.MONGO_URL,{
    dbName: "mernsapp",
}
);
    console.log("data connected");}
    catch(err){
        console.log("connecting in linking database",err);
    }
}