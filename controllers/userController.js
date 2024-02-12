const asyncHandler=require("express-async-handler")

//@desc register a user
//@route post /api/users/register
//@acess public


const registerUser=asyncHandler(async (req,res)=>{
    res.json({message : "Register the users"})
})


//@desc login a user
//@route post /api/users/login
//@acess public


const loginUser=asyncHandler(async (req,res)=>{
    res.json({message : "login users"})
})


//@desc current Info of a user
//@route post /api/users/currnt
//@acess private


const currentInfoUser=asyncHandler(async (req,res)=>{
    res.json({message : "Current User Information"})
})


module.exports={registerUser,loginUser,currentInfoUser};