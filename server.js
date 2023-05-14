import { app } from "./app.js"
import { database_connect } from "./database.con/databConnect.js";





//database connect call here 
database_connect();







//applisting in this port 
app.listen(process.env.port,()=>{
    console.log("server is working");
})