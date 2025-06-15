const mangoose=require("mongoose")

const connectDB=async()=>{
    await mangoose.connect("mongodb+srv://gokul:Gokul12@cluster0.gyywb0v.mongodb.net/devTinder")
}


module.exports={connectDB}
// connectDB().then(()=>{
//     console.log("conncetion done")
// }).catch((err)=>console.log("failed conncetion"))