import express from "express";
import { Registor,Login,getmydata } from "../controller/user_callback.js";
import isAuthenticated from "../middleware/is_authenticated.js";


const router=express.Router();


router.post("/registor",Registor);
router.post("/login",Login);
router.get("/getmydata",isAuthenticated,getmydata);




export default router;