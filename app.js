import express from "express";
import { config } from "dotenv";
import user_router from "./route/user_routing.js"
import cors from "cors";
import { error_handler } from "./error_middleware/error_handler.js";
import cookieParser from  "cookie-parser";

export const app=express();



//config of env
config({
    path:"./config.env"
})


//using middleware
app.use(cors(
    {
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    }

));
app.use(express.json());
app.use(cookieParser());




//routing define 
app.use("/api/v1/user",user_router);




app.get("/",(req,res)=>{
    res.send("hello mama")
    
})


app.use(error_handler);



