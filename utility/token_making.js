import jwt from "jsonwebtoken";


const Token_make=(res,msg,user)=>{
    
    try {
        
        const token =jwt.sign({_id:user._id},process.env.JWTsecuritykey);

        res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:(process.env.NODE_env==="development")?"lax":"none",
            secure:(process.env.NODE_env==="development")?false:true,

        }
        ).json({
            status:true,
            msg: msg
        })
    } catch (error) {
        console.log(error);
        
    }

}

        
export default Token_make;