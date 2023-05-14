import mongoose from "mongoose";

export const database_connect=()=>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"Chatdata"}
).then(()=>{
    console.log("database is connnected")
}).catch((e)=>{
    console.log(e)
})
}

