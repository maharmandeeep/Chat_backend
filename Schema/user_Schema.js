import mongoose from "mongoose"

const user_Schema=mongoose.Schema({
    name:{
        type:String,
        required :true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
       
        select:false,//it will prohibitted to acess password in anywhere is i want to acess it i have to make select true on that line 
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,

    },
    avtarImage:{
        type:String,
        default:"",
    }
})


const Users=mongoose.model("Users",user_Schema);
export default Users;