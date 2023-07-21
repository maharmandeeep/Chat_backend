import express from "express";
import { Registor,Login,getmydata ,setAvatar,getAllUsers,logout} from "../controller/user_callback.js";
import isAuthenticated from "../middleware/is_authenticated.js";


const router=express.Router();


router.post("/registor",Registor);
router.post("/login",Login);
router.get("/getmydata",isAuthenticated,getmydata);
router.post("/setAvatar/:id",setAvatar);
router.get("/getallusers/:id",getAllUsers);
router.get("/logout",logout);    




export default router;