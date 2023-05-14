 
 //we are making changing by default error class beacuse on this we can only send message dara not status code so by this we also set status_code in each call
 
 class Error_own extends Error{

    constructor(message,status_code){
        super(message);
        this.status_code=status_code;
    }
}


//this is middleware what will happen after this error_own call in next this mddleware take a action and give a respone

export function error_handler(err,req,res,next){
     err.msg=err.message || "Internal server error",
     err.status_code=err.status_code || 500;

     res.status(err.status_code).json({
        status:false,
        msg:err.msg,
     })
}


export default Error_own;