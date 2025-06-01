const express=require("express")
const app=express()

// app.use("/data",(req,res)=>{
//     res.send("It is a message from data page")
// })

// app.use("/help",(req,res)=>{
//   res.send("this is from help page")
// })

// app.use("/",(req,res)=>{
//     res.send("The base page is not  loaded")
// })

app.get("/user",(req,res)=>{
    res.send("this is specific to get user")
})


app.post("/user",(req,res)=>{
    res.send("Data is saved in the DB")
})


app.listen(3000,()=>{
    console.log("server is done !!")
})