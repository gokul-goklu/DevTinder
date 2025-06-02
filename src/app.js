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

// app.get("/user",(req,res)=>{
//     res.send("this is specific to get user")
// })


// app.post("/user",(req,res)=>{
//     res.send("Data is saved in the DB")
// })

//now the word 's' is optional here
// app.get(/^\/u?ser$/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//+ used to add as many 'u' the letter before +
// app.get(/^\/u+ser$/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//* should have 0 u or many u

//any a in the url
// app.get(/a/,(req,res)=>{
//     res.send("this is just testing for params and routes")
// })

//anything ends with user
//  app.get(/.*user$/,(req,res)=>{
//    res.send("this is just testing for params and routes")
//  })


//query useage
//http://localhost:3000/user?id=1212&pass=123456

//  app.get("/user",(req,res)=>{
//     console.log(req.query)
//    res.send("this is just testing for params and routes")
//  })



//param usage
//http://localhost:3000/user/1212/123456

//  app.get("/user/:id/:password",(req,res)=>{
//     console.log(req.params)
//    res.send("this is just testing for params and routes")
//  })



//Route handlers

app.use("/user",(req,res,next)=>{
  console.log("started")
 
  res.send("sfvwd")
   next()
},(req,res)=>{
res.send("starting it from 2")
})

app.listen(3000,()=>{
    console.log("server is done !!")
})