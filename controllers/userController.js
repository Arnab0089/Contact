const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");

//@desc register a user
//@route post /api/users/register
//@acess public


const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const userAvaliable= await User.findOne({email});
    if(userAvaliable){
        res.status(400);
        throw new Error("User Already register!")
    }
    //Hash password
    const hashedPassword= await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);
    // create a new user
    
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    });

    console.log(`User created Successfully ${user}`);
    if(user){
        res.status(201).json({_id:user.id ,email:user.email, })
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message : "Register the users"})
})


//@desc login a user
//@route post /api/users/login
//@acess public


const loginUser=asyncHandler(async (req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user=await User.findOne({email});

    // compare password with hashed password

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user.id,
            },

        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        )
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
    res.json({message : "login users"})
})

// const loginUser = asyncHandler(async (req, res) => {

//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400);
//         throw new Error("All fields are mandatory!");
//     }

//     const user = await User.findOne({ email }); // corrected from user.findOne to User.findOne

//     // compare password with hashed password

//     if (user && (await bcrypt.compare(password, user.password))) {
//         const accessToken = jwt.sign({
//             user: {
//                 username: user.username,
//                 email: user.email,
//                 id: user.id,
//             },

//         },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: "1m" }
//         )
//         res.status(200).json({ accessToken });
//     }
//     else {
//         res.status(401);
//         throw new Error("Email or password is not valid");
//     }
//     // This line should not be reached after sending the response.
//     // So, remove this line.
//     // res.json({ message: "login users" })
// })


//@desc current Info of a user
//@route post /api/users/currnt
//@acess private


const currentInfoUser=asyncHandler(async (req,res)=>{
    
    res.json(req.user);
})


module.exports={registerUser,loginUser,currentInfoUser};