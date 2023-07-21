import jwt from "jsonwebtoken";
import Users from "../Schema/user_Schema.js";



const isAuthenticated=async (req,res,next)=>{


    try {
        const{token}=req.cookies;

        if(!token){
            res.status(401).json(
                {
                    status:false,
                    msg:"logon first"
                }
            )
               
            
        }
        else{

            const decoded=jwt.verify(token,process.env.JWTsecuritykey);
    
            req.user=await Users.findById(decoded._id);
          
          
            next();


        }
       

        
    } catch (error) {
        console.log(error);
    }
    
   
    
 
}

export default isAuthenticated;