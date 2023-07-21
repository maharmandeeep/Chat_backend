import express from "express";
import { addmsg ,getmsg} from "../controller/messgae_callback.js";



const M_router=express.Router();

M_router.post("/addmsg",addmsg);

M_router.post("/getmsg",getmsg);


export default M_router;