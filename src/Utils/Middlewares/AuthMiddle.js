const middleAuth=(req,res,next)=>{
const token="abcd";//should come from request jus now hardcoded
const auth=token==="abcd"
if(!auth){
  res.status(401).send("it is unauth")
}
next()
}

const userAuth=(req,res,next)=>{
const token="abcdef";//should come from request jus now hardcoded
console.log("user checking done")
const auth=token==="abcdef"
if(!auth){
  res.status(401).send("it is user unauth")
}
next()
}
module.exports={middleAuth,userAuth}