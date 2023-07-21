import Users from "../Schema/user_Schema.js";
import bcrypt from "bcryptjs";
import Token_make from "../utility/token_making.js";
import Error_own from "../error_middleware/error_handler.js";

//after registor api endpoint hit this function will run
async function Registor(req, res, next) {
  try {
    const { name, email, password } = req.body;

    //checking here is name is already taken or not

    const nameCheck = await Users.findOne({ name });

    if (nameCheck) {
      return next(new Error_own("username is already Exist", 400));
    }

    //checking here email is already is used or not

    const emailCheck = await Users.findOne({ email });

    if (emailCheck) {
      return next(new Error_own("email is already Exist", 400));
    }

    //hasing password before pushing into databse
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await Users.create({
      name,
      email,
      password: hash,
    });

    //calling token function

    Token_make(res, "successfully registor", user);
  } catch (error) {
    next(error);
  }
}
/*


for gap 


    */

//for Login calbback funnction

async function Login(req, res, next) {
  try {
    const { name, password } = req.body;

    // checking email is already exist in database or not
    const user = await Users.findOne({ name }).select("+password");

    if (!user) {
      return next(new Error_own("incorrect username and password", 400));
    }

    //checcking password is match with original one oe not
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return next(new Error_own("incorrect username and password", 400));
    }

    // if all good we can make a token

    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined
    };
     
    Token_make(res, "successfully Login", userWithoutPassword);
  } catch (error) {
    next(error);
  }
}



//taking data 

const getmydata=(req,res,next)=>{
  
  
  res.status(200).json({
    status:true,
    user:req.user,
  })

}


//set avatr funtion

async function setAvatar(req,res,next){

  try {
    const id=req.params.id;
    const avatarimage=req.body.image;

    const user=await Users.findByIdAndUpdate(id,
      {
        avtarImage:avatarimage,
        isAvatarImageSet:true,
      },{
        new:true
      }
      )

     res.status(200).json({
      success:user.isAvatarImageSet,
      msg:"Your avatar is set for your profile",
      image:user.avtarImage

     })

 
   
  } catch (error) {
    next(error)
  }

}

//this functon is to get all user data
 const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "avtarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};



async function logout(req,res,next){

  try {
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:(process.env.NODE_env==="development")?"lax":"none",
      secure:(process.env.NODE_env==="development")?false:true,
    })
    .json({
      success: "true",
      msg: "logout sucessfully",
    });
    
  } catch (error) {
    next(error)
  }


}    



export { Registor, Login ,getmydata,setAvatar,getAllUsers,logout};
